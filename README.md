# letspreview-cli

[![Chat with Us!](https://badges.gitter.im/salte-io/letspreview-cli.svg)](https://gitter.im/salte-io/letspreview-cli?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Build Status](https://travis-ci.org/salte-io/letspreview-cli.svg?branch=master)](https://travis-ci.org/salte-io/letspreview-cli)
[![Code Coverage Status](https://img.shields.io/coveralls/salte-io/letspreview-cli/master.svg)](https://coveralls.io/github/salte-io/letspreview-cli)

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

    $ letspreview publish

### unpublish

    $ letspreview unpublish

## Supported node.js versions

The `letspreview-cli` targets the current LTS version (4.x) of Node.js and later.