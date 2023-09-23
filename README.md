# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Skeleton UI

```bash
npm create skeleton-app@latest my-skeleton-app
```

- Pick theme
- Pick Typescript

### Change theme

Modify `<body>` in `app.html`:

```bash
<body data-sveltekit-preload-data="hover" data-theme="skeleton">
```

## Fontawesome

```bash
npm install --save @fortawesome/fontawesome-free
```

Add styles to `app.html`:

```bash
<head>
  <link href="./../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css" rel="stylesheet" />
  <link href="./../node_modules/@fortawesome/fontawesome-free/css/solid.css" rel="stylesheet" />
  <link href="./../node_modules/@fortawesome/fontawesome-free/css/regular.css" rel="stylesheet" />
</head>
```

### Usage

Solid:

```bash
<i class="fa-solid fa-skull" />
```

Regular (borders only):

```bash
<i class="fa-regular fa-skull" />
```

# Image attributes

<a href="https://www.freepik.com/free-vector/dining-set_6027751.htm#query=cutlery%20cartoon&position=49&from_view=keyword&track=ais">Image by brgfx</a> on Freepik
