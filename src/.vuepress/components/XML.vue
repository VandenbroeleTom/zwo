<template>
    <div class="xml">
        <textarea name="xml" id="xml" cols="30" rows="10">
            <workout_file>
                <author>{{ author }}</author>
                <name>{{ name }}</name> 
                <description>{{ description }}</description>
                <sportType>bike</sportType>
                <durationType>time</durationType>
                <tags>
                    <tag v-for="tag in tags" :name="tag" />
                </tags>
                <workout>
                    <template v-for="block in workout" :is="block.type" :Duration="block.duration" :Power="block.power" />
                    <FreeRide Duration="600" FlatRoad="0"/>
                    <Ramp Duration="895" PowerLow="0.25" PowerHigh="0.75" pace="0"/>
                    <SteadyState Duration="960" Power="0.763" pace="0"/>
                    <SteadyState Duration="240" Power="0.5" pace="0"/>
                    <SteadyState Duration="960" Power="0.763" pace="0"/>
                    <Cooldown Duration="600" PowerLow="0.75" PowerHigh="0.25" pace="0"/>
                </workout>
              </workout_file>
        </textarea>
    </div>
</template>

<script>
    export default {
        name: 'xml',
        props: {
            data: Object,
        },
    }
</script>