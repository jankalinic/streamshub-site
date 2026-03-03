# StreamsHub Docs Site Source

This repository contains the source code for the StreamsHub documentation site.
It aggregates documentation from other StreamsHub repositories (like the Console) and builds a static site using Hugo.

## Pulling Documentation Sources
Documentation from other StreamsHub repositories is pulled automatically using the JBang script:
```shell
./scripts/docBuilder.java <github-access-token>
```
This script uses a configuration file called sources.json.
Each repository version (tag) will be pulled and built into its own versioned documentation folder.

``` yaml
{
    "name": "StreamsHub Console",
    "sourceOwner": "streamshub",
    "sourceRepository": "console", 
    "developmentBranch": "main",
    "docsFolderPath": "docs",
    "tags":["0.1.0"] 
}
``` 

| Field               | Description                                                 |
| ------------------- |-------------------------------------------------------------|
| `name`              | Friendly name for the project.                              |
| `sourceOwner`       | GitHub organization or user that owns the repo.             |
| `sourceRepository`  | Repository name.                                            |
| `developmentBranch` | Branch that contains ongoing development of docs.           |
| `docsFolderPath`    | Path inside this repo where documentation Markdown resides. |
| `tags`              | List of Git tags to pull versioned documentation for.       |



### How It Works

For each tag in tags, the script pulls the contents of docsFolderPath from that repo/tag.
The pulled content is placed under:
```
content/docs/<name>/<tag>
```
If a folder already exists for a tag, it will not be re-pulled.
The contents of the developmentBranch are always pulled on every build, via the GitHub Action .github/workflows/publish.yaml.

### Generating a Contents Page
The script also generates a contents file with links to:
* The development branch documentation
* Each configured tag/version
If you only want the development branch, you can skip this by adding:
``` yaml
"skipContentsPageCreation": true
```

### Pulling Documentation Locally
To pull documentation sources locally, you need a GitHub personal access token with access to all repositories listed in sources.json.
``` shell
./scripts/docBuilder.java <github-access-token>
```
This will pull all configured tags and the development branch and organize the documentation under `content/docs/`.
You can build the site locally using Hugo after pulling the documentation.

## Building the site

### Prerequisites

The site uses the static site generator [hugo](https://github.com/gohugoio/hugo) and the [PostCSS](https://gohugo.io/hugo-pipes/postcss/) packages in order to build the source.
You will need to install [jbang](https://www.jbang.dev/) locally in order to run the documentation build.
You will also need [asciidoctor](https://asciidoctor.org/) installed to build most of the documentation pages.
To successfully build the site you may also need the full submodule `themes/hugo-book` to be present locally. Easiest way is to update the submodule:
``` shell
git submodule update --init --recursive
```

### Building the site locally

You can build the site by running:
``` shell 
hugo
``` 
from the repository root.
Or run a live preview server by running:
``` shell
hugo server --buildDrafts --disableFastRender  
```