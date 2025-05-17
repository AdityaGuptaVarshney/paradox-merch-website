import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'http://localhost:8082/query',
    generates: {
        './src/utils/gql.generated.ts': {
            plugins: ['typescript', 'typescript-operations'],
            "config": {
                avoidOptionals: true,
                dedupeOperationSuffix: true,
                maybeValue: "T",
                preResolveTypes: true,
                scalars: {
                    DateOnly: {
                        input: 'string',
                        output: 'string'
                    },
                    Time: {
                        input: 'string',
                        output: 'string'
                    },
                    TimeOnly: {
                        input: 'string',
                        output: 'string'
                    },
                    text: {
                        input: 'string',
                        output: 'string'
                    },
                    ID: {
                        input: 'string',
                        output: 'string'
                    }
                }
            },
        }
    }
}
export default config
