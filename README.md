# letspreview-cli

[![Chat with Us!](https://badges.gitter.im/letspreview/letspreview-cli.svg)](https://gitter.im/letspreview/letspreview-cli?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Build Status](https://travis-ci.org/letspreview/letspreview-cli.svg?branch=master)](https://travis-ci.org/letspreview/letspreview-cli)
[![Coverage Status](https://coveralls.io/repos/github/letspreview/letspreview-cli/badge.svg?branch=master)](https://coveralls.io/github/letspreview/letspreview-cli?branch=master)

A command-line tool for deploying review apps to https://letspreview.io.

## Overview

`letspreview-cli` includes a number of tools for publishing branches for review:

  * __publish__ - Deploys the application to Lets PReview for review!
  * __unpublish__	- Undeploys the application from Lets PReview.

## Installation

Install via npm:

    $ npm install -g letspreview-cli

Then run via `letspreview <command>`:

    $ letspreview help

## Commands

### help

Displays help on commands and options:

    $ letspreview help

### publish

Publishes the contents of the current working directory to https://myapp.letspreview.io:

    $ letspreview publish myapp -k <api key>

Visit http://letspreview.io to sign-up for free and receive your api key.

### unpublish

Removes https://myapp.letspreview.io:

    $ letspreview unpublish myapp -k <api key>

## Supported node.js versions

The `letspreview-cli` targets the current LTS version (6.x) of Node.js and later.
