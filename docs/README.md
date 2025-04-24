# Docs


## Sasss

```scss
// MATERIAL
$color-black: rgb(0,0,0);
$color-white: rgb(250,250,250);
@function getColor() {}
@mixin colorMix() {}


// THEMES
[data-theme="light"] {
  --body-background: #{$color-white};
}

[data-theme="dark"] {
  --body-background: #{$color-black};
}

// CORE
.body {
  background-color: var(--body-background);
}
```