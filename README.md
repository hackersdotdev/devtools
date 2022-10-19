# [hackers.dev](https://hackers.dev) devtools

This is a collection of tools used internally to build hackers.dev.

The packages aren't stable yet, so either use a pinned version, or use the source as inspiration.

## Publishing Flow

1. Make changes and open a PR
2. Run `yarn changeset` to create a changeset
3. Push a commit with the changeset
4. Merge the PR
5. The Changeset bot and GitHub action will create a PR
6. Review the PR and merge
7. Changeset bot and GitHub action will publish change, create a GH release, and add a tag.
