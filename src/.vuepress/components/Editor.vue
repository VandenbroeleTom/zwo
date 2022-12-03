<template>
    <div class="editor">
        <Import @data="(e) => workoutFile = e"/>

        <div class="ftp">
            <form action="#">
                <div class="form-group">
                    <label for="author" class="form-label">Author</label>
                    <input type="text" class="form-control" id="author" v-model="workoutFile.author" />
                </div>
                <div class="form-group">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" v-model="workoutFile.name">
                </div>
                <div class="form-group">
                    <label for="description" class="form-label">Description</label>
                    <input type="text" class="form-control" id="description" v-model="workoutFile.description">
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
                        <th>#</th>
                        <th>Type</th>
                        <th>Power</th>
                        <th>Duration</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="workout, index in workoutFile.workout">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <select class="form-control" v-model="workout.tag" name="tag" id="tag">
                                <option v-for="tag in workoutTags" :value="tag">{{ tag }}</option>
                            </select>
                        </td>
                        <td>
                            <div v-if="workout.tag != 'Warmup' && workout.tag != 'Cooldown'">
                                <div class="row">
                                    <div class="col-md-9">
                                        <input type="number" name="power" class="form-control" v-model="(workout.attributes || {}).Power">
                                    </div>
                                    <div class="col-md-3">
                                        = {{ Math.round((workout.attributes || {}).Power * ftp) || 0 }}W
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="row">
                                    <div class="col-md-9">
                                        <input type="number" name="power-low" class="form-control" v-model="(workout.attributes || {}).PowerLow"> 
                                    </div>
                                    <div class="col-md-3">
                                        = {{ Math.round((workout.attributes || {}).PowerLow * ftp) || 0 }}W
                                    </div>
                                </div>

                                <div>-</div>

                                <div class="row">
                                    <div class="col-md-9">
                                        <input type="number" name="power-high" class="form-control" v-model="(workout.attributes || {}).PowerHigh">
                                    </div>
                                    <div class="col-md-3">
                                        = {{ Math.round((workout.attributes || {}).PowerHigh * ftp) || 0 }}W
                                    </div>
                                </div>
                                
                                
                            </div>
                        </td>
                        <td><input class="form-control" type="number" name="duration" v-model="(workout.attributes || {}).Duration"></td>
                        <td><a @click.prevent="workoutFile.workout.splice(index, 1)">&times;</a></td>
                    </tr>
                </tbody>
            </table>

            <button @click="workoutFile.workout.push({ tag: '', attributes: { Power: 0, Duration: 0 } })" class="btn btn-primary">Add line</button>
        </div>

        <!-- <chart /> -->

        <pre>
{{ workoutFile }}
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
                        attributes: [
                            {
                                attribute: 'Power',
                                value: 0.5
                            }
                        ]
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
                workoutTags: ['SteadyState', 'FreeRide', 'Warmup', 'Cooldown'],
                workoutFile: {
                    author: '',
                    name: '',
                    description: '',
                    sportType: '',
                    tags: [],
                    workout: [
                        {
                            tag: 'Warmup',
                            attributes: {
                                Duration: 600,
                                PowerLow: .25,
                                PowerHigh: .75,
                            }
                        }
                    ],
                },
            };
        },
    }
</script>

<style scoped>
    table {
        display: table;
        width: 100%;
    }

    a {
        cursor: pointer;
    }

    pre {
        color: white;
    }
</style>