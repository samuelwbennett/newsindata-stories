# The News in Data: interactive stories

Scrolling chart stories served at https://stories.thenewsindata.com.

## Keep Reading
Every story page ends with `<section class="nid-kr"></section><script src="/more/keep-reading.js" defer></script>` (right after `</article>`).
The cards come from `more/stories.json`, newest first. When a story is published on thenewsindata.com, add it to the top of that file
(slug, title, section, featured image URL) so it shows up under Keep Reading on every interactive page.
