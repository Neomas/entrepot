This is a [Next.js](https://nextjs.org/) / [Storyblok](https://www.storyblok.com) starter project .

## Getting Started

First, run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## .env.local

Copy the .env.example to .env.local and complete with the correct variables for your storyblok space

## storyblok.config.js

Put relations that need to be resolved here.

## storyblok components that load data

Next async (server) components throw an error when viewing them in preview mode.
To preview live changes we use the storyblok bridge which makes the child components go into "client" mode and throwing an error when they are async.
There is a "container" component StoryblokLoader that takes a prop "getData" which can contain an async function that returns data. When data is loaded a "data" prop is added to the child component.

```bash
  <StoryblokLoader
    preview={preview}
    getData={async () => {
      // load and return data from storyblok
      return data;
    }}>
    <ComponentToRender locale={locale} /> //this will have a "data" prop added and filled with data from getData
  </StoryblokLoader>
```

## Favicon

Use e.g. https://realfavicongenerator.net/ to setup favicons and download them under public/favicons

## Storyblok Typescript

The command below downloads the storyblok components and generate typescript types from that.
Output will be in the types/compoents-schema.ts file. Types are named [ComponentName]Storyblok

```bash
yarn sb-ts
```

**requirements:**

- correct SB_SPACE_ID in .env file
- put revolved relations inside /storyblok.config.js
- make sure you are correctly loged into storyblok CLI

```bash
npx storyblok login
```

## storyblok setup

set preview for draft to http://localhost:3000/api/draft?secret=[SB_PREVIEW_SECRET]

## styling

### tokens

Design tokens are put in the styles/tokens folder.
It works best with vscode plugin scss intellisens
tokens are always prefixed by their type:

- $font- for fonts
- $font-weight- for named font weights
- $color- for colors
- $effect- for box-shadows
- $breakpoints- for breakpoints
- $ease- for easing equations

Design tokens can be generated through the command below.
This script will take the json files from /tokens and convert them to styles/\_generated.scss and styles/\_mixins

```bash
yarn tokens
```

tokens can be generated with the design tokens [plugin](https://www.figma.com/community/plugin/888356646278934516/Design-Tokens).

- token format => standard (W3C draft)
- include token prefixes in token names

#### font family in tokens

if the name of the font in de design tokens does not match the name of the font in css, you can convert them inside the scripts/transform-tokens.js file.
There will be a commented example in the baseConfig

### usefull functions/mixins:

- rem mixin turns pixel values into rem: rem(16px);
- spread-link covers a the entire parent of the parent
- hide-text hides text inside a link mostly used in combo with spreak-link

### grid

Designs are made on a (12 col) grid. You can use helpers mixins to apply these in css.

- @include row() takes 2 optional parameters nr of columns, and gutter width / this will add display:grid to
- @include span() takes 2 optional parameters nr of columns to span, colum to start from

## inspect bundle

It is good practice to check/analyze the bundle to make sure no unneeded packages are being included. Run command below and you will get a map (in browser) of all packages and their size

```bash
yarn analyze
```
