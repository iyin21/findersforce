Everything from a feature should be exported from the index.ts file which behaves as the public API of the feature.

You should import stuff from other features only by using:

`import { item } from "@/features/feature-1"`
