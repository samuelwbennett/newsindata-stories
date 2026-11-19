/* The News in Data: world religions 2020-2070 (Pew Research Center, Nov. 18, 2026).
   Mounts: #nid-rl-map (dot world map, find your country / your religion), #nid-rl-bloom (where Christians live),
   #nid-rl-why (births vs. switching), #nid-rl-top (countries with the most Christians), #nid-rl-home. */
(function(){
if(window.__nidRl)return;window.__nidRl=1;
var BASE=(function(){var s=document.currentScript&&document.currentScript.src;return s?s.replace(/[^\/]*$/,''):'https://stories.thenewsindata.com/religion/';})();
var GREEN='#007a55',INK='#13241b',MUTED='#5f7268',RULE='#dce5e0',FAINT='#eef3f0',GRAY='#c3ccc7';
var SERIF='"Times New Roman",Times,serif',SANS='-apple-system,"Helvetica Neue",Arial,sans-serif';
var REL=[['Christians','#3f6fb5'],['Muslims','#0a8f63'],['Unaffiliated','#a3adb5'],['Hindus','#e2892f'],['Buddhists','#b35c98'],['Jews','#6a5bbf'],['Other religions','#c4825f']];
var REGN={A:'Asia-Pacific',E:'Europe',L:'Latin America-Caribbean',M:'Middle East-North Africa',N:'North America',S:'Sub-Saharan Africa'};
var RAW='Afghanistan;A;0,100,0,0,0,0,0;0,100,0,0,0,0,0;39.1;99.4|Albania;E;18,75,8,0,0,0,0;9,90,1,0,0,0,0;2.9;1.8|Algeria;M;0,98,1,0,0,0,0;0,99,1,0,0,0,0;44.0;64.0|Angola;S;93,0,6,0,0,0,1;93,1,6,0,0,0,1;33.5;107.1|Argentina;L;88,1,9,0,0,0,1;77,1,20,0,0,0,2;45.2;44.9|Armenia;A;97,0,1,0,0,0,1;97,0,1,0,0,0,1;2.9;2.5|Aruba;L;81,0,6,0,1,0,11;77,1,8,0,1,0,13;0.1;0.1|Australia;A;47,4,42,3,3,0,1;29,10,47,7,4,0,4;25.7;39.0|Austria;E;68,8,22,0,0,0,1;51,19,29,0,1,0,1;8.9;9.0|Azerbaijan;A;0,95,5,0,0,0,0;0,96,4,0,0,0,0;10.2;10.2|Bahamas;L;98,0,2,0,0,0,0;94,0,4,0,0,0,1;0.4;0.4|Bahrain;M;14,74,0,11,0,0,1;12,78,0,9,0,0,0;1.5;2.3|Bangladesh;A;0,91,0,8,1,0,0;0,92,0,7,1,0,0;166.3;237.2|Barbados;L;77,1,20,0,0,0,1;80,1,18,1,0,0,1;0.3;0.3|Belarus;E;85,0,14,0,0,0,1;89,1,9,0,0,0,1;9.4;7.5|Belgium;E;51,7,39,0,0,0,3;33,18,44,1,2,0,4;11.5;12.7|Belize;L;74,0,16,0,0,0,9;74,0,16,0,0,0,9;0.4;0.6|Benin;S;53,31,5,0,0,0,10;49,34,6,0,0,0,11;13.1;31.2|Bhutan;A;1,0,0,23,75,0,2;1,1,0,25,71,0,2;0.8;0.8|Bolivia;L;89,0,10,0,0,0,1;92,0,6,0,0,0,2;11.8;16.7|Bosnia and Herzegovina;E;45,54,1,0,0,0,1;35,63,1,0,0,0,1;3.3;1.4|Botswana;S;82,0,15,0,0,0,2;88,1,10,0,0,0,1;2.4;4.2|Brazil;L;81,0,13,0,0,0,6;74,0,19,0,0,0,7;208.7;202.8|Brunei;A;7,82,0,1,6,0,3;7,82,0,2,6,0,2;0.4;0.5|Bulgaria;E;79,10,10,0,0,0,0;80,11,8,0,0,0,0;6.9;4.1|Burkina Faso;S;28,67,1,0,0,0,4;28,67,0,0,0,0,4;21.5;44.6|Burundi;S;95,3,1,0,0,0,1;95,3,1,0,0,0,1;12.6;31.0|Cambodia;A;0,2,0,0,97,0,0;1,2,0,0,97,0,1;16.7;23.8|Cameroon;S;70,25,2,0,0,0,3;64,30,3,0,0,0,3;26.2;71.9|Canada;N;53,5,35,2,2,1,3;33,16,41,4,1,1,5;38.2;41.9|Cape Verde;S;78,0,21,0,0,0,1;73,1,25,0,0,0,0;0.5;0.4|Central African Republic;S;91,6,0,0,0,0,3;94,4,0,0,0,0,1;5.0;8.1|Chad;S;39,56,3,0,0,0,2;37,58,3,0,0,0,2;17.2;57.0|Channel Islands;E;85,0,14,0,0,0,0;85,0,14,0,0,0,0;0.2;0.1|Chile;L;68,0,30,0,0,0,1;52,0,46,0,0,0,2;19.4;21.1|China;A;2,2,90,0,4,0,3;1,3,91,0,3,0,2;1426.1;1005.0|Colombia;L;86,0,10,0,0,0,4;75,0,24,0,0,0,1;50.6;50.1|Comoros;S;1,98,0,0,0,0,1;1,99,0,0,0,0,1;0.8;0.6|Congo, Democratic Republic;S;96,1,1,0,0,0,1;96,1,1,0,0,0,2;96.0;311.9|Congo, Republic;S;92,1,5,0,0,0,1;92,2,4,0,0,0,1;5.8;14.0|Costa Rica;L;88,0,10,0,0,0,2;85,0,13,0,0,0,2;5.0;5.5|Croatia;E;91,1,7,0,0,0,1;91,1,7,0,0,0,1;4.0;2.6|Cuba;L;61,0,22,0,0,0,17;58,0,21,0,0,0,21;11.2;6.9|Curacao;L;91,0,6,2,0,0,0;85,1,9,2,1,0,2;0.2;0.2|Cyprus;A;68,24,7,0,1,0,0;67,25,7,0,1,0,0;1.3;1.2|Czech Republic;E;26,0,73,0,0,0,0;20,1,77,0,0,0,1;10.6;8.3|Denmark;E;77,4,17,0,1,0,1;56,11,28,1,2,0,2;5.8;6.3|Djibouti;S;1,98,1,0,0,0,0;3,94,1,0,0,0,1;1.1;1.9|Dominican Republic;L;78,0,20,0,0,0,3;69,0,29,0,0,0,2;11.0;12.1|East Timor;A;100,0,0,0,0,0,0;100,0,0,0,0,0,0;1.3;1.7|Ecuador;L;89,0,8,0,0,0,3;86,0,10,0,0,0,3;17.5;21.1|Egypt;M;5,95,0,0,0,0,0;4,96,0,0,0,0,0;109.3;180.1|El Salvador;L;87,0,12,0,0,0,1;85,0,13,0,0,0,1;6.2;5.3|Equatorial Guinea;S;89,4,5,0,0,0,2;91,2,5,0,0,0,2;1.7;3.5|Eritrea;S;47,52,1,0,0,0,1;46,52,1,0,0,0,1;3.3;7.3|Estonia;E;53,1,44,0,0,0,3;47,2,47,0,0,0,2;1.3;0.9|Eswatini;S;93,0,6,0,0,0,0;92,1,6,0,0,0,1;1.2;2.0|Ethiopia;S;62,36,0,0,0,0,2;54,46,0,0,0,0,0;118.9;280.1|Fiji;A;70,6,0,24,0,0,0;75,5,0,19,0,0,0;0.9;0.9|Finland;E;72,2,25,0,0,0,1;55,7,35,1,1,0,1;5.5;5.1|France;E;46,9,43,0,1,1,0;25,20,53,0,1,0,1;65.9;69.2|French Guiana;L;84,1,3,2,1,0,9;81,1,7,1,1,0,8;0.3;0.7|French Polynesia;A;93,0,5,0,0,0,1;92,0,6,0,0,0,1;0.3;0.3|Gabon;S;84,9,6,0,0,0,2;76,16,6,0,0,0,3;2.3;6.3|Gambia;S;3,97,0,0,0,0,0;2,98,0,0,0,0,0;2.5;5.6|Georgia;E;88,10,1,0,0,0,0;87,10,2,0,0,0,0;3.8;3.6|Germany;E;56,7,36,0,0,0,0;42,14,40,1,1,0,2;83.6;77.7|Ghana;S;71,20,1,0,0,0,8;70,21,1,0,0,0,7;31.9;61.1|Greece;E;89,5,5,0,0,0,1;75,12,12,0,0,0,2;10.7;7.6|Grenada;L;87,0,6,0,0,0,6;88,0,5,0,0,0,6;0.1;0.1|Guadeloupe;L;96,0,2,0,0,0,0;93,0,5,0,0,0,1;0.4;0.4|Guam;A;94,0,2,0,1,0,3;90,1,5,0,1,0,3;0.2;0.3|Guatemala;L;92,0,6,0,0,0,2;90,0,7,0,0,0,3;17.4;24.3|Guinea;S;12,87,1,0,0,0,0;9,89,2,0,0,0,0;13.4;28.7|Guinea-Bissau;S;22,56,12,0,0,0,11;17,60,12,0,0,0,11;2.0;4.0|Guyana;L;66,7,3,23,0,0,1;72,6,2,19,0,0,1;0.8;0.8|Haiti;L;89,0,9,0,0,0,2;89,0,10,0,0,0,1;11.2;12.7|Honduras;L;88,0,10,0,0,0,2;89,0,10,0,0,0,1;10.1;13.1|Hong Kong;A;19,0,71,0,8,0,1;16,2,75,1,5,0,1;7.5;5.0|Hungary;E;72,0,27,0,0,0,0;66,2,30,0,0,0,0;9.7;7.1|Iceland;E;75,1,20,0,1,0,2;58,3,31,0,2,0,5;0.4;0.5|India;A;2,15,0,79,1,0,3;2,20,0,76,1,0,2;1402.6;1700.3|Indonesia;A;10,87,0,2,1,0,0;13,84,0,1,1,0,1;274.8;324.5|Iran;A;0,100,0,0,0,0,0;0,100,0,0,0,0,0;87.7;96.4|Iraq;M;0,99,0,0,0,0,0;0,100,0,0,0,0,0;42.1;85.3|Ireland;E;81,2,16,1,0,0,1;69,7,19,3,0,0,2;5.0;5.6|Israel;M;2,15,4,0,0,77,2;2,17,4,0,0,76,1;8.8;14.6|Italy;E;80,4,13,0,1,0,1;58,14,24,1,2,0,2;59.9;49.5|Ivory Coast;S;45,46,6,0,0,0,3;38,51,6,0,0,0,4;28.9;73.9|Jamaica;L;69,0,24,0,0,0,8;68,0,23,0,0,0,8;2.8;1.8|Japan;A;2,0,57,0,37,0,3;3,1,69,1,22,0,4;126.3;85.4|Jordan;M;3,97,0,0,0,0,0;3,97,0,0,0,0,0;10.9;26.1|Kazakhstan;A;19,78,3,0,0,0,0;11,86,2,0,0,0,0;19.5;34.0|Kenya;S;86,11,2,0,0,0,2;81,15,2,0,0,0,2;52.2;103.0|Kiribati;A;98,0,0,0,0,0,2;98,0,0,0,0,0,2;0.1;0.2|Kosovo;E;6,94,0,0,0,0,0;4,96,0,0,0,0,0;1.8;1.9|Kuwait;M;11,80,0,9,0,0,0;10,81,0,8,0,0,0;4.4;7.4|Kyrgyzstan;A;6,92,1,0,0,0,1;3,95,1,0,0,0,1;6.7;11.2|Laos;A;2,0,0,0,64,0,34;1,0,0,0,49,0,50;7.3;10.2|Latvia;E;77,1,17,0,0,0,5;72,1,22,0,0,0,5;1.9;1.1|Lebanon;M;28,68,0,0,0,0,4;19,77,0,0,0,0,5;5.7;5.8|Lesotho;S;97,0,2,0,0,0,1;99,0,1,0,0,0,0;2.2;2.9|Liberia;S;85,13,1,0,0,0,1;80,16,2,0,0,0,2;5.1;11.6|Libya;M;1,99,0,0,0,0,0;1,98,0,0,0,0,0;7.0;10.3|Lithuania;E;92,0,7,0,0,0,1;86,1,13,0,0,0,1;2.8;1.4|Luxembourg;E;66,2,25,0,0,0,6;56,7,31,1,1,0,4;0.6;1.1|Macao;A;10,0,68,0,20,0,2;15,2,66,0,16,0,1;0.7;0.6|Madagascar;S;74,1,22,0,0,0,2;65,1,31,0,0,0,3;29.0;68.9|Malawi;S;87,12,1,0,0,0,0;85,15,1,0,0,0,0;19.5;47.1|Malaysia;A;9,64,1,6,19,0,1;9,72,1,7,10,0,1;33.9;39.3|Maldives;A;2,94,0,3,1,0,0;2,94,0,3,1,0,0;0.5;0.7|Mali;S;3,94,3,0,0,0,1;2,94,3,0,0,0,0;21.7;65.4|Malta;E;89,4,5,1,1,0,0;62,14,19,2,1,1,1;0.5;0.8|Martinique;L;96,0,3,0,0,0,1;86,1,10,0,0,0,2;0.4;0.4|Mauritania;S;0,99,0,0,0,0,0;0,99,0,0,0,0,0;4.6;15.3|Mauritius;S;33,18,1,48,0,0,0;37,18,1,43,0,0,0;1.3;0.9|Mayotte;S;1,99,0,0,0,0,0;1,98,0,0,0,0,1;0.3;1.2|Mexico;L;89,0,11,0,0,0,0;77,0,23,0,0,0,1;126.8;152.4|Micronesia, Federated States;A;99,0,1,0,0,0,0;99,0,0,0,0,0,0;0.1;0.2|Moldova;E;100,0,0,0,0,0,0;98,1,1,0,0,0,0;3.1;1.4|Mongolia;A;1,4,41,0,51,0,3;1,5,42,0,49,0,3;3.3;4.5|Montenegro;E;76,21,1,0,0,0,2;67,31,1,0,0,0,2;0.6;0.5|Morocco;M;0,100,0,0,0,0,0;0,100,0,0,0,0,0;36.6;42.5|Mozambique;S;61,19,14,0,0,0,5;59,23,14,0,0,0,5;30.8;89.1|Myanmar;A;6,3,0,0,89,0,1;6,2,0,0,90,0,1;53.0;51.5|Namibia;S;91,0,6,0,0,0,4;88,1,8,0,0,0,3;2.7;5.6|Nepal;A;2,5,0,81,8,0,4;3,5,0,81,7,0,3;29.0;32.8|Netherlands;E;35,6,54,1,0,0,4;22,13,61,1,1,0,2;17.6;17.3|New Caledonia;A;85,3,11,0,1,0,1;80,4,15,0,1,0,1;0.3;0.4|New Zealand;A;40,1,51,3,1,0,3;29,6,52,6,3,0,4;5.1;7.1|Nicaragua;L;85,0,13,0,0,0,2;76,0,21,0,0,0,3;6.6;8.4|Niger;S;1,98,1,0,0,0,0;1,98,1,0,0,0,0;23.7;73.9|Nigeria;S;43,56,0,0,0,0,0;32,67,1,0,0,0,0;214.0;418.1|North Korea;A;0,0,73,0,2,0,25;0,0,73,0,2,0,25;26.1;23.7|North Macedonia;E;65,35,1,0,0,0,0;53,46,1,0,0,0,0;1.9;1.1|Norway;E;71,4,22,0,1,0,1;56,9,30,1,2,0,2;5.4;6.4|Oman;M;8,82,0,10,0,0,0;7,86,0,7,0,0,0;4.5;9.0|Pakistan;A;1,97,0,2,0,0,0;1,97,0,2,0,0,0;235.0;476.4|Palestinian territories;M;1,99,0,0,0,0,0;1,99,0,0,0,0,0;5.1;6.3|Panama;L;91,0,6,0,0,0,2;87,0,10,0,0,0,1;4.3;5.9|Papua New Guinea;A;99,0,0,0,0,0,1;99,0,0,0,0,0,1;9.8;17.1|Paraguay;L;94,0,4,0,0,0,2;94,0,4,0,0,0,2;6.6;9.2|Peru;L;94,0,5,0,0,0,0;87,0,12,0,0,0,0;32.8;39.5|Philippines;A;91,6,0,0,0,0,2;87,10,0,0,0,0,2;112.1;129.7|Poland;E;91,0,9,0,0,0,0;88,0,11,0,0,0,0;38.2;24.3|Portugal;E;85,0,14,0,0,0,0;76,2,20,0,0,0,1;10.4;9.3|Puerto Rico;L;89,0,10,0,0,0,0;84,0,15,0,0,0,1;3.3;1.2|Qatar;M;13,76,0,11,0,0,0;13,75,0,11,0,0,0;2.8;4.9|Reunion;S;88,4,2,5,0,0,1;83,8,3,4,0,0,2;0.9;1.1|Romania;E;99,0,1,0,0,0,0;96,1,3,0,0,0,0;19.4;10.4|Russia;E;70,8,20,0,0,0,1;73,11,14,0,0,0,2;146.4;97.5|Rwanda;S;97,2,1,0,0,0,0;97,2,1,0,0,0,0;13.1;28.8|Samoa;A;98,0,0,0,0,0,2;96,0,0,0,0,0,4;0.2;0.2|Sao Tome and Principe;S;84,0,10,0,0,0,6;80,0,13,0,0,0,7;0.2;0.4|Saudi Arabia;M;4,93,0,3,0,0,0;4,94,0,2,0,0,0;31.0;58.1|Senegal;S;2,98,0,0,0,0,0;1,99,0,0,0,0,0;16.8;39.4|Serbia;E;92,4,4,0,0,0,0;90,8,2,0,0,0,0;6.9;3.8|Seychelles;S;94,1,2,1,1,0,1;88,4,2,3,1,0,1;0.1;0.1|Sierra Leone;S;20,80,0,0,0,0,0;18,82,0,0,0,0,0;7.9;15.8|Singapore;A;19,16,20,5,31,0,9;19,25,21,9,22,0,3;5.6;6.8|Slovakia;E;74,0,25,0,0,0,1;66,1,32,0,1,0,1;5.5;4.4|Slovenia;E;65,2,32,0,0,0,1;52,5,41,0,0,0,1;2.1;1.8|Solomon Islands;A;95,0,0,0,0,0,4;95,0,0,0,0,0,4;0.7;1.6|Somalia;S;0,100,0,0,0,0,0;0,100,0,0,0,0,0;16.7;45.5|South Africa;S;85,2,3,1,0,0,9;86,3,4,0,0,0,7;60.6;81.2|South Korea;A;32,0,48,0,19,0,0;26,1,60,1,11,0,0;51.9;36.0|South Sudan;S;61,6,0,0,0,0,33;61,6,0,0,0,0,33;10.7;20.8|Spain;E;69,4,26,0,0,0,0;41,12,45,0,0,0,1;47.7;40.8|Sri Lanka;A;6,10,0,15,70,0,0;6,12,0,13,68,0,0;22.6;24.5|St. Lucia;L;92,0,6,0,0,0,2;95,0,3,0,0,0,1;0.2;0.1|St. Vincent and the Grenadines;L;86,0,8,0,0,0,6;89,0,4,0,0,0,6;0.1;0.1|Sudan;M;0,99,1,0,0,0,0;0,99,0,0,0,0,0;46.8;117.2|Suriname;L;53,13,8,22,0,0,3;66,8,9,15,1,0,2;0.6;0.7|Sweden;E;61,8,29,0,1,0,1;39,19,35,1,2,0,3;10.4;11.8|Switzerland;E;62,6,31,1,1,0,0;45,12,38,1,2,0,2;8.6;9.6|Syria;M;4,94,2,0,0,0,0;4,94,2,0,0,0,0;21.0;30.5|Taiwan;A;6,0,23,0,19,0,52;9,2,29,0,21,0,39;23.7;15.6|Tajikistan;A;1,99,0,0,0,0,0;1,99,0,0,0,0,0;9.7;19.6|Tanzania;S;65,30,3,0,0,0,2;65,31,3,0,0,0,1;61.0;188.8|Thailand;A;1,5,0,0,94,0,0;2,7,0,0,91,0,0;71.6;58.9|Togo;S;57,16,8,0,0,0,19;49,16,11,0,0,0,24;8.7;19.8|Tonga;A;98,0,1,0,0,0,1;97,0,0,0,0,0,3;0.1;0.1|Trinidad and Tobago;L;70,5,2,21,0,0,1;72,5,3,18,0,0,2;1.5;1.2|Tunisia;M;0,99,0,0,0,0,0;0,100,0,0,0,0,0;12.0;12.8|Turkey;A;0,97,3,0,0,0,0;0,95,4,0,0,0,0;86.1;104.6|Turkmenistan;A;6,94,0,0,0,0,0;6,94,0,0,0,0,0;6.9;10.1|U.S. Virgin Islands;L;94,0,4,0,0,0,1;90,1,6,1,0,0,2;0.1;0.1|Uganda;S;88,11,0,0,0,0,1;85,13,0,0,0,0,1;44.5;128.2|Ukraine;E;83,1,15,0,0,0,0;85,3,11,0,1,0,1;44.7;28.3|United Arab Emirates;M;14,73,0,12,0,0,0;12,77,0,10,0,0,0;9.4;16.8|United Kingdom;E;49,6,40,2,0,0,1;25,16,52,3,1,0,3;67.4;71.8|United States;N;64,1,30,1,1,2,1;48,4,41,2,1,1,3;339.4;364.4|Uruguay;L;44,0,52,0,0,0,3;37,0,59,0,0,0,3;3.4;3.1|Uzbekistan;A;3,96,1,0,0,0,1;2,97,0,0,0,0,1;33.6;60.7|Vanuatu;A;84,0,1,0,0,0,15;83,0,1,0,0,0,16;0.3;0.7|Venezuela;L;88,0,10,0,0,0,2;82,0,15,0,0,0,3;28.4;33.3|Vietnam;A;8,0,68,0,23,0,1;9,0,74,0,16,0,1;98.1;104.1|Western Sahara;M;0,100,0,0,0,0,0;0,99,0,0,0,0,0;0.5;0.6|Yemen;M;0,100,0,0,0,0,0;0,100,0,0,0,0,0;36.1;95.1|Zambia;S;98,1,0,0,0,0,1;98,1,0,0,0,0,1;19.1;52.3|Zimbabwe;S;87,1,11,0,0,0,2;86,1,12,0,0,0,1;15.5;31.7';
var C=RAW.split('|').map(function(l){var a=l.split(';');return {name:a[0],reg:a[1],y20:a[2].split(',').map(Number),y70:a[3].split(',').map(Number),p20:+a[4],p70:+a[5]};});
function el(t,a,txt){var n=document.createElementNS('http://www.w3.org/2000/svg',t);for(var k in a)n.setAttribute(k,a[k]);if(txt!=null)n.textContent=txt;return n;}
function hard(n,size,weight){n.style.setProperty('font-family',SERIF,'important');if(size)n.style.setProperty('font-size',size,'important');if(weight)n.style.setProperty('font-weight',weight,'important');}
function svgText(g,x,y,txt,o){o=o||{};var t=el('text',{x:x,y:y,'text-anchor':o.a||'start','font-size':o.s||13,fill:o.f||INK,'font-family':o.sans?SANS:SERIF,'font-weight':o.w||'normal'},txt);g.appendChild(t);return t;}
function pct(v){return v<1?'<1%':v+'%';}
function top(arr){var m=0;arr.forEach(function(v,i){if(v>arr[m])m=i;});return m;}
function css(){
 if(document.getElementById('nid-rl-css'))return;var s=document.createElement('style');s.id='nid-rl-css';
 s.textContent='.nid-rl{font-family:'+SERIF+';color:'+INK+';max-width:760px;margin:2em auto;position:relative}'+
 '.nid-rl .rl-h{font-weight:bold;font-size:1.35em;line-height:1.2;text-align:center;margin:0 0 .2em}'+
 '.nid-rl .rl-d{text-align:center;color:'+MUTED+';font-size:.95em;margin:0 0 .9em;line-height:1.35}'+
 '.nid-rl svg{width:100%;height:auto;display:block;overflow:visible}'+
 '.nid-rl .rl-bar{display:flex;flex-wrap:wrap;gap:.5em;justify-content:center;align-items:center;margin:0 0 .7em;font-family:'+SANS+';font-size:13px}'+
 '.nid-rl .rl-seg{display:inline-flex;background:'+FAINT+';border-radius:999px;padding:3px}'+
 '.nid-rl .rl-seg button{border:0;background:transparent;padding:.42em .95em;border-radius:999px;font:inherit;color:'+MUTED+';cursor:pointer}'+
 '.nid-rl .rl-seg button.on{background:#fff;color:'+INK+';box-shadow:0 1px 3px rgba(0,0,0,.12);font-weight:600}'+
 '.nid-rl input.rl-find,.nid-rl select.rl-sel{border:1px solid '+RULE+';border-radius:999px;padding:.45em .95em;font:inherit;background:#fff;color:'+INK+';min-width:11em}'+
 '.nid-rl .rl-key{display:flex;flex-wrap:wrap;justify-content:center;gap:.4em 1em;font-family:'+SANS+';font-size:12px;color:'+MUTED+';margin:.5em 0 0}'+
 '.nid-rl .rl-key i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:.35em;vertical-align:-1px}'+
 '.nid-rl .rl-card{background:#fff;border:1px solid '+RULE+';border-radius:10px;padding:.8em 1em;margin:.8em 0 0;font-size:.98em;line-height:1.45}'+
 '.nid-rl .rl-card b{font-weight:bold}.nid-rl .rl-stack{display:flex;height:14px;border-radius:7px;overflow:hidden;margin:.25em 0 .55em;background:'+FAINT+'}'+
 '.nid-rl .rl-stack span{display:block;height:100%}.nid-rl .rl-yr{font-family:'+SANS+';font-size:12px;color:'+MUTED+'}'+
 '.nid-rl .rl-src{font-size:.78em;color:'+MUTED+';margin:.8em 0 0;line-height:1.4}'+
 '.nid-rl .rl-tip{position:absolute;pointer-events:none;background:#fff;border:1px solid '+RULE+';border-radius:8px;padding:.4em .65em;font-size:.86em;line-height:1.35;box-shadow:0 2px 8px rgba(0,0,0,.08);display:none;z-index:5;max-width:220px}'+
 '.nid-rl circle.rl-dot{transition:fill .9s ease,r .9s ease,opacity .5s ease}';
 document.head.appendChild(s);
}
function frame(box,title,dek){css();box.innerHTML='';box.classList.add('nid-rl');var h=document.createElement('p');h.className='rl-h';h.textContent=title;hard(h,'1.35em','bold');box.appendChild(h);if(dek){var d=document.createElement('p');d.className='rl-d';d.textContent=dek;hard(d,'.95em');box.appendChild(d);}}
function src(box,html){var p=document.createElement('p');p.className='rl-src';p.innerHTML=html;hard(p,'.78em');box.appendChild(p);}
function tipper(box){var t=document.createElement('div');t.className='rl-tip';box.appendChild(t);return {show:function(h,ev){t.innerHTML=h;t.style.display='block';var r=box.getBoundingClientRect(),x=ev.clientX-r.left+12,y=ev.clientY-r.top+12;if(x+230>r.width)x=ev.clientX-r.left-232;t.style.left=Math.max(0,x)+'px';t.style.top=y+'px';},hide:function(){t.style.display='none';}};}
function stack(arr){return '<div class="rl-stack">'+arr.map(function(v,i){return v?'<span style="width:'+v+'%;background:'+REL[i][1]+'"></span>':'';}).join('')+'</div>';}
function seg(opts,cb){var w=document.createElement('div');w.className='rl-seg';opts.forEach(function(o,i){var b=document.createElement('button');b.type='button';b.textContent=o;if(!i)b.className='on';b.onclick=function(){[].forEach.call(w.children,function(x){x.className='';});b.className='on';cb(i);};w.appendChild(b);});return w;}

/* ---------- 1. dot world map ---------- */
function map(box){
 frame(box,'The World’s Largest Religion, Country By Country, 2020 And 2070','Each dot takes the color of the country’s largest group; bigger dots mean a bigger majority. Find your country, or pick a religion.');
 var year=0,rel=-1,focus=-1;
 var bar=document.createElement('div');bar.className='rl-bar';box.appendChild(bar);
 bar.appendChild(seg(['2020','2070'],function(i){year=i;paint();card();}));
 var sel=document.createElement('select');sel.className='rl-sel';sel.innerHTML='<option value="-1">Largest religion</option>'+REL.map(function(r,i){return '<option value="'+i+'">'+r[0]+'</option>';}).join('');sel.onchange=function(){rel=+sel.value;paint();key();card();};bar.appendChild(sel);
 var inp=document.createElement('input');inp.className='rl-find';inp.placeholder='Find your country';inp.setAttribute('list','rl-list');var dl=document.createElement('datalist');dl.id='rl-list';dl.innerHTML=C.map(function(c){return '<option value="'+c.name+'">';}).join('');bar.appendChild(inp);bar.appendChild(dl);
 inp.oninput=function(){var v=inp.value.trim().toLowerCase();var i=-1;C.forEach(function(c,j){if(c.name.toLowerCase()==v)i=j;});if(i<0&&v.length>2){C.forEach(function(c,j){if(i<0&&c.name.toLowerCase().indexOf(v)==0)i=j;});}if(i>=0||!v){focus=i;paint();card();}};
 var wrap=document.createElement('div');box.appendChild(wrap);
 var keyEl=document.createElement('div');keyEl.className='rl-key';box.appendChild(keyEl);
 var cardEl=document.createElement('div');cardEl.className='rl-card';box.appendChild(cardEl);
 src(box,'Source: Pew Research Center, The Future of World Religions (Nov. 18, 2026), projections for 201 countries and territories. Some small countries appear as a single dot; a few are too small to show but can be found by name.');
 var t=tipper(box),dots=[],svg;
 function key(){
  if(rel<0)keyEl.innerHTML=REL.map(function(r){return '<span><i style="background:'+r[1]+'"></i>'+r[0]+'</span>';}).join('');
  else keyEl.innerHTML='<span>Share of each country that is '+REL[rel][0].toLowerCase()+':</span>'+[10,30,60,90].map(function(v){return '<span><i style="background:'+REL[rel][1]+';opacity:'+(.15+.85*v/100)+'"></i>'+v+'%</span>';}).join('');
 }
 function paint(){
  dots.forEach(function(d){
   var c=d.c<0?null:C[d.c],arr=c?(year?c.y70:c.y20):null,dim=focus>=0&&d.c!==focus;
   if(!c){d.n.setAttribute('fill','#e3e8e5');d.n.setAttribute('r',1.6);d.n.style.opacity=dim?.25:1;return;}
   if(rel<0){var m=top(arr);d.n.setAttribute('fill',REL[m][1]);d.n.setAttribute('r',(1.05+1.75*arr[m]/100).toFixed(2));d.n.style.opacity=dim?.12:1;}
   else{var v=arr[rel];d.n.setAttribute('fill',v>0?REL[rel][1]:'#e3e8e5');d.n.setAttribute('r',v>0?2.6:1.5);d.n.style.opacity=dim?.1:(v>0?(.15+.85*v/100):1);}
  });
 }
 function card(){
  if(focus<0){
   if(rel<0)cardEl.innerHTML=year?'<b>By 2070</b>, Pew projects Christian majorities in 110 countries, down from 120. The U.S., Canada and Germany lose theirs, and France, the U.K. and South Korea become majority unaffiliated. Tap a country or search for yours.':'<b>In 2020</b>, Christians were the majority in 120 countries and Muslims in 53. Switch to 2070 to see what changes, or tap a country.';
   else{var tot20=0,tot70=0;C.forEach(function(c){tot20+=c.p20*c.y20[rel]/100;tot70+=c.p70*c.y70[rel]/100;});cardEl.innerHTML='<b>'+REL[rel][0]+'</b>: about '+fmtN(tot20)+' people in 2020 and '+fmtN(tot70)+' in 2070, by Pew’s projection. Darker dots mean a larger share of the country.';}
   return;}
  var c=C[focus];
  cardEl.innerHTML='<b>'+c.name+'</b> <span class="rl-yr">'+REGN[c.reg]+' · population '+fmtN(c.p20)+' in 2020, '+fmtN(c.p70)+' in 2070</span>'+
   '<div class="rl-yr" style="margin-top:.5em">2020</div>'+stack(c.y20)+'<div class="rl-yr">2070</div>'+stack(c.y70)+
   REL.map(function(r,i){if(!c.y20[i]&&!c.y70[i])return '';return '<span style="white-space:nowrap;margin-right:1em;font-size:.92em"><i style="display:inline-block;width:9px;height:9px;border-radius:50%;background:'+r[1]+';margin-right:.3em"></i>'+r[0]+' '+pct(c.y20[i])+' → '+pct(c.y70[i])+'</span>';}).join('');
 }
 key();
 fetch(BASE+'dots.json').then(function(r){return r.json();}).then(function(D){
  svg=el('svg',{viewBox:'0 0 '+D.w+' '+D.h,role:'img','aria-label':'Dot map of the world colored by each country’s largest religion'});wrap.appendChild(svg);
  for(var i=0;i<D.d.length;i+=3){var n=el('circle',{cx:D.d[i],cy:D.d[i+1],r:0,class:'rl-dot',fill:'#e3e8e5'});n.style.transitionDelay=Math.round(D.d[i]/D.w*500)+'ms';svg.appendChild(n);dots.push({n:n,c:D.d[i+2]});(function(ci){n.addEventListener('mousemove',function(ev){if(ci<0)return;var c=C[ci],a=year?c.y70:c.y20,m=top(a);t.show('<b>'+c.name+'</b><br>'+(rel<0?REL[m][0]+' '+pct(a[m]):REL[rel][0]+' '+pct(a[rel]))+(year?' in 2070':' in 2020'),ev);});n.addEventListener('mouseleave',t.hide);n.addEventListener('click',function(){if(ci<0)return;focus=focus===ci?-1:ci;inp.value=focus<0?'':C[ci].name;paint();card();});})(D.d[i+2]);}
  setTimeout(function(){paint();setTimeout(function(){dots.forEach(function(d){d.n.style.transitionDelay='0ms';});},1500);},60);
  card();
 }).catch(function(){wrap.innerHTML='<p class="rl-d">The map could not load.</p>';});
}
function fmtN(m){return m>=1000?(m/1000).toFixed(2).replace(/0$/,'')+' billion':(m>=10?Math.round(m):m.toFixed(1))+' million';}

/* ---------- 2. bloom: where Christians live ---------- */
var BLOOM={y20:[['S',70],['L',55],['E',51],['A',27],['N',24],['M',1]],y70:[['S',159],['L',54],['E',32],['A',29],['N',19],['M',2]]};
var BCOL={S:GREEN,L:'#9fb8ad',E:'#b9c7c0',A:'#cdd7d2',N:'#aebdb6',M:'#dfe6e2'};
function bloom(box,compact){
 frame(box,'More Than Half Of The World’s Christians Will Live In Sub-Saharan Africa By 2070',compact?null:'Each dot is 10 million Christians. Green dots live in sub-Saharan Africa.');
 var W=760,H=compact?300:310,GA=Math.PI*(3-Math.sqrt(5)),S=compact?7.2:7.6;
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':'Two clusters of dots, each dot 10 million Christians, showing the share in sub-Saharan Africa growing from 31% in 2020 to 54% in 2070'});box.appendChild(svg);
 var all=[];
 [['y20',W*.27,'2020','2.27 billion Christians','31%'],['y70',W*.71,'2070','2.96 billion Christians','54%']].forEach(function(cfg,ci){
  var cx=cfg[1],cy=compact?165:170,k=0,list=BLOOM[cfg[0]];
  list.forEach(function(g){for(var j=0;j<g[1];j++){var r=S*Math.sqrt(k+.5)*.62,th=k*GA,c=el('circle',{cx:(cx+r*Math.cos(th)).toFixed(1),cy:(cy+r*Math.sin(th)).toFixed(1),r:3.1,fill:BCOL[g[0]]});c.style.transformOrigin=cx+'px '+cy+'px';c.style.transform='scale(0)';c.style.transition='transform .6s cubic-bezier(.2,.9,.3,1.25) '+(ci*900+k*5)+'ms';svg.appendChild(c);all.push(c);k++;}});
  svgText(svg,cx,30,cfg[2],{a:'middle',s:20,w:'bold'});
  svgText(svg,cx,50,cfg[3],{a:'middle',s:13,f:MUTED,sans:true});
  var tot=list.reduce(function(a,g){return a+g[1];},0);svgText(svg,cx,cy+S*.62*Math.sqrt(tot)+28,cfg[4]+' in sub-Saharan Africa',{a:'middle',s:15,w:'bold',f:GREEN});
 });
 svgText(svg,W/2,175,'→',{a:'middle',s:28,f:GRAY});
 function go(){all.forEach(function(c){c.style.transform='scale(1)';});}
 if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){go();io.disconnect();}},{threshold:.3});io.observe(svg);}else go();
 if(!compact){var k=document.createElement('div');k.className='rl-key';k.innerHTML=[['S','Sub-Saharan Africa'],['L','Latin America'],['E','Europe'],['N','North America'],['A','Asia-Pacific'],['M','Middle East-North Africa']].map(function(x){return '<span><i style="background:'+BCOL[x[0]]+'"></i>'+x[1]+'</span>';}).join('');box.appendChild(k);
 src(box,'Source: Pew Research Center, The Future of World Religions (2026). Regional totals rounded to the nearest 10 million.');}
}

/* ---------- 3. why: births vs switching ---------- */
function why(box){
 frame(box,'Births, Not Converts, Drive The Change','Projected change from 2020 to 2070, in millions of people.');
 var rows=[['Muslims','Births minus deaths',1600,REL[1][1]],['Muslims','Switching religion',-8,REL[1][1]],['Christians','Births minus deaths',792,REL[0][1]],['Christians','Switching religion',-105,REL[0][1]],['Unaffiliated','Switching religion',117,'#8f9aa3']];
 var W=760,L=250,Z=L+70,R=740,ROW=40,H=rows.length*ROW+30,sc=(R-Z-90)/1600;
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':'Bar chart: Muslims gain about 1.6 billion from births minus deaths and lose 8 million to switching; Christians gain 792 million from births minus deaths and lose 105 million to switching; the unaffiliated gain 117 million from switching'});box.appendChild(svg);
 svg.appendChild(el('line',{x1:Z,x2:Z,y1:4,y2:H-22,stroke:'#9aaba2'}));
 rows.forEach(function(r,i){var y=10+i*ROW,first=i==0||rows[i-1][0]!=r[0];
  if(first)svgText(svg,8,y+ROW/2+1,r[0],{s:15,w:'bold'});
  svgText(svg,Z-32,y+ROW/2+1,r[1],{a:'end',s:12,f:MUTED,sans:true});
  var w=Math.max(2,Math.abs(r[2])*sc),x=r[2]>=0?Z:Z-w,b=el('rect',{x:r[2]>=0?Z:Z,y:y+8,width:0,height:ROW-18,rx:3,fill:r[3],opacity:r[1].indexOf('Switch')==0?.55:1});svg.appendChild(b);
  setTimeout(function(){b.style.transition='all .8s ease '+(i*120)+'ms';b.setAttribute('x',x);b.setAttribute('width',w);},50);
  var lab=(r[2]>0?'+':'−')+(Math.abs(r[2])>=1000?(Math.abs(r[2])/1000).toFixed(1)+' billion':Math.abs(r[2])+' million');
  svgText(svg,r[2]>=0?Z+w+6:Z+6,y+ROW/2+1,lab,{s:13,w:'bold',f:r[3],sans:true});
 });
 src(box,'Source: Pew Research Center (2026). Pew gives Muslim natural increase as “about 1.6 billion.” Movement between Christianity and Islam roughly cancels out: about 9.2 million Muslims are projected to become Christian and 9 million Christians to become Muslim. Most Christians who leave become unaffiliated.');
}

/* ---------- 4. countries with the most Christians ---------- */
var TOPC=[['Congo (DRC)',92.4,299.1],['United States',217.3,174.3],['Ethiopia',73.2,150.3],['Brazil',168.3,150.0],['Nigeria',92.8,132.0],['Tanzania',39.4,123.3],['Mexico',113.1,116.9],['Philippines',102.5,113.1],['Uganda',39.0,109.5],['Angola',31.1,99.6],['Russia',102.4,70.7]];
function topc(box){
 frame(box,'Congo Is Projected To Pass The U.S. As The Country With The Most Christians','Christians in each country, millions. Hover a line.');
 var W=760,H=420,X1=230,X2=530,T=40,B=H-20,max=310,Y=function(v){return B-(B-T)*v/max;},t=tipper(box);
 var svg=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':'Slope chart of Christian populations by country, 2020 and 2070'});box.appendChild(svg);
 svgText(svg,X1,22,'2020',{a:'middle',s:15,w:'bold'});svgText(svg,X2,22,'2070',{a:'middle',s:15,w:'bold'});
 function lay(col){var o=TOPC.slice().sort(function(a,b){return b[col]-a[col];}),m={},prev=-99;o.forEach(function(d){var y=Math.max(Y(d[col]),prev+13);m[d[0]]=y;prev=y;});return m;}var L1=lay(1),L2=lay(2);
 var order=TOPC.slice().sort(function(a,b){return b[2]-a[2];});
 order.forEach(function(d){var af=d[0].indexOf('Congo')==0||['Ethiopia','Nigeria','Tanzania','Uganda','Angola'].indexOf(d[0])>=0,col=af?GREEN:'#9aa8a1',hl=d[0].indexOf('Congo')==0||d[0]=='United States';
  var g=el('g',{});svg.appendChild(g);
  g.appendChild(el('line',{x1:X1,y1:Y(d[1]),x2:X2,y2:Y(d[2]),stroke:col,'stroke-width':hl?3:1.6,opacity:hl?1:.8}));
  g.appendChild(el('circle',{cx:X1,cy:Y(d[1]),r:3.5,fill:col}));g.appendChild(el('circle',{cx:X2,cy:Y(d[2]),r:3.5,fill:col}));
  svgText(g,X1-10,L1[d[0]]+4,d[0]+'  '+Math.round(d[1]),{a:'end',s:12,f:hl?INK:MUTED,w:hl?'bold':'normal',sans:true});
  svgText(g,X2+10,L2[d[0]]+4,Math.round(d[2])+'  '+d[0],{s:12,f:hl?INK:MUTED,w:hl?'bold':'normal',sans:true});
  var hit=el('line',{x1:X1,y1:Y(d[1]),x2:X2,y2:Y(d[2]),stroke:'transparent','stroke-width':12});g.appendChild(hit);
  hit.addEventListener('mousemove',function(ev){t.show('<b>'+d[0]+'</b><br>'+d[1].toFixed(0)+' million in 2020, '+d[2].toFixed(0)+' million in 2070',ev);});hit.addEventListener('mouseleave',t.hide);
 });
 var k=document.createElement('div');k.className='rl-key';k.innerHTML='<span><i style="background:'+GREEN+'"></i>Sub-Saharan Africa</span><span><i style="background:#9aa8a1"></i>Elsewhere</span>';box.appendChild(k);
 src(box,'Source: Pew Research Center (2026). The 10 countries with the most Christians in 2070, plus Russia, which drops out of the top 10.');
}

function boot(){var m={'nid-rl-map':map,'nid-rl-bloom':function(b){bloom(b,false);},'nid-rl-home':function(b){bloom(b,true);},'nid-rl-why':why,'nid-rl-top':topc};Object.keys(m).forEach(function(id){var b=document.getElementById(id);if(b&&!b.dataset.done){b.dataset.done=1;m[id](b);}});}
if(document.readyState=='loading')document.addEventListener('DOMContentLoaded',boot);else boot();setTimeout(boot,1500);
})();
