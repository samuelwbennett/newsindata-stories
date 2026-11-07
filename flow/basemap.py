import numpy as np, sys, json, warnings; warnings.filterwarnings('ignore')
from PIL import Image, ImageFilter
import geopandas as gpd, matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
def make(ext,W,H,out):
    lon0,lon1,lat0,lat1=ext
    N=np.asarray(Image.open('earth_normal_2048.jpg').convert('RGB')).astype(float)/255*2-1
    S=np.asarray(Image.open('earth_specular_2048.jpg').convert('L')).astype(float)/255
    h,w=S.shape
    xs=np.linspace(lon0,lon1,W);ys=np.linspace(lat1,lat0,H)
    px=((xs+180)/360*w).clip(0,w-1);py=((90-ys)/180*h).clip(0,h-1)
    PX,PY=np.meshgrid(px,py)
    def samp(A):
        x0=np.floor(PX).astype(int);y0=np.floor(PY).astype(int);x1=(x0+1).clip(0,w-1);y1=(y0+1).clip(0,h-1);fx=PX-x0;fy=PY-y0
        if A.ndim==3: fx=fx[...,None];fy=fy[...,None]
        return A[y0,x0]*(1-fx)*(1-fy)+A[y0,x1]*fx*(1-fy)+A[y1,x0]*(1-fx)*fy+A[y1,x1]*fx*fy
    n=samp(N);sea=samp(S)
    L=np.array([-0.6,0.6,0.55]);L/=np.linalg.norm(L)
    shade=(n*L).sum(-1)  # ~ -1..1
    shade=(shade-np.median(shade))*3.2
    land=(sea<0.5).astype(float)
    land=np.asarray(Image.fromarray((land*255).astype('uint8')).filter(ImageFilter.GaussianBlur(1.2))).astype(float)/255
    oc=np.array([11,15,22.]);ld=np.array([38,44,54.])
    img=oc*(1-land[...,None])+ (ld+shade[...,None]*22)*land[...,None]
    img=img.clip(0,255).astype('uint8')
    Image.fromarray(img).save(out)
    # borders overlay
    wd=gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))
    fig=plt.figure(figsize=(W/100,H/100),dpi=100,facecolor='#0b0f16');ax=fig.add_axes([0,0,1,1]);ax.set_axis_off()
    ax.imshow(img,extent=[lon0,lon1,lat0,lat1],aspect='auto')
    wd.boundary.plot(ax=ax,color='#5a6472',linewidth=0.35,alpha=0.55)
    ax.set_xlim(lon0,lon1);ax.set_ylim(lat0,lat1)
    fig.savefig(out,dpi=100,facecolor='#0b0f16');plt.close(fig)
if __name__=='__main__':
    a=json.loads(sys.argv[1]);make(a['ext'],a['W'],a['H'],a['out'])
