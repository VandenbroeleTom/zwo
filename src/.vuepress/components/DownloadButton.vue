<template>
    <div class="download">
        <a class="btn btn-primary" :download="download" :href="href">Download</a>
    </div>
</template>

<script>
    export default {
        name: 'DownloadButton',
        props: {
            workoutFile: Object,
        },
        computed: {
            download() {
                // todo url encode.
                return (this.workoutFile.name || 'Workout') + '.zwo';
            },
            href() {
                return 'data:text/xml;charset=utf8,' + encodeURIComponent(this.xml);
            },
            xml() {

                if (typeof document == "undefined") {
                    return '';
                }

                const xml = document.implementation.createDocument('', '', null);
                const workoutFile = xml.createElement('workout_file');
                
                const author = xml.createElement('author');
                author.innerHTML = this.workoutFile.author;
                workoutFile.appendChild(author);

                const name = xml.createElement('name');
                name.innerHTML = this.workoutFile.name;
                workoutFile.appendChild(name);

                const description = xml.createElement('description');
                description.innerHTML = this.workoutFile.description;
                workoutFile.appendChild(description);

                const sportType = xml.createElement('sportType');
                sportType.innerHTML = 'bike';
                workoutFile.appendChild(sportType);

                const tags = xml.createElement('tags');

                for (const tagName of this.workoutFile.tags) {
                    const tag = xml.createElement('tag');
                    tag.setAttribute('name', tagName.toUpperCase());
                    tags.appendChild(tag);
                }

                const workout = xml.createElement('workout');

                for (const line of this.workoutFile.workout) {
                    if (line.tag) {
                        workout.appendChild((() => {
                            const child = xml.createElement(line.tag);
    
                            for (const key of Object.keys(line.attributes)) {
                                console.log(key);
                                child.setAttribute(key, line.attributes[key]);
                            }
    
                            return child;
                        })());
                    }
                }

                workoutFile.appendChild(workout);

                xml.appendChild(workoutFile);

                const serializer = new XMLSerializer();

                console.log(serializer.serializeToString(xml.documentElement));

                return serializer.serializeToString(xml.documentElement);
            },
        },
    }
</script>