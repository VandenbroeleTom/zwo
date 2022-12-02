<template>
    <div class="editor">
        <div class="ftp">
            <form action="#">
                <div class="form-group">
                    <label for="author" class="form-label">Author</label>
                    <input type="text" class="form-control" id="author" v-model="author" />
                </div>
                <div class="form-group">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" v-model="name">
                </div>
                <div class="form-group">
                    <label for="description" class="form-label">Description</label>
                    <input type="text" class="form-control" id="description" v-model="description">
                </div>
                <div class="form-group">
                    <label for="ftp" class="form-label">FTP</label>
                    <input v-model="ftp" type="number" name="ftp" id="ftp" class="form-control" />
                </div>
            </form>
        </div>

        <div class="input">
            <table class="input">
                <thead>
                    <tr>
                        <th>

                        </th>
                        <th>
                            #
                        </th>
                        <th>
                            Type
                        </th>
                        <th>
                            Duration
                        </th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="block, index in blocks">
                        <td></td>
                        <td>{{ index + 1 }}</td>
                        <td>
                            <select v-model="block.type" name="type" id="type">
                                <option v-for="type in types" :value="type">{{ type.label }}</option>
                            </select>
                        </td>
                        <td><input type="number" name="" id="" v-model="block.duration"></td>
                        <td><a @click.prevent="blocks = []">&times;</a></td>
                    </tr>
                </tbody>
            </table>

            <button @click="blocks.push({})" class="btn btn-primary">Add line</button>
        </div>

        <!-- <chart /> -->

        <pre>
{{ blocks }}
        </pre>

        <!-- <XML /> -->
    </div>
</template>

<script>
    export default {
        name: 'editor',
        data() {
            return {
                ftp: 300,
                author: '',
                name: '',
                description: '',
                types: [
                    {
                        id: 'Z1',
                        label: 'Z1',
                        tag: 'SteadyState',
                        attributes: {
                            Power: 0.5
                        }
                    },
                    {
                        id: 'Z2',
                        label: 'Z2',
                        tag: 'SteadyState',
                        attributes: {
                            Power: 0.6,
                            pace: 0,
                        },
                    },
                    {
                        id: 'warmup',
                        label: 'Warmup',
                        tag: 'Ramp',
                        attributes: {
                            PowerLow: .25,
                            PowerHigh: .75,
                            pace: 0
                        }
                    },
                    {
                        id: 'cooldown',
                        label: 'Cooldown',
                        tag: 'Ramp',
                        attributes: {
                            PowerLow: .75,
                            PowerHigh: .25,
                            pace: 0
                        }
                    }
                ],
                blocks: [{}],
            };
        },
    }
</script>

<style scoped>
    table {
        display: table;
        width: 100%;
    }

    label,
    input,
    select {
        display: block;
        width: 100%;
    }

    a {
        cursor: pointer;
    }

    pre {
        color: white;
    }
</style>