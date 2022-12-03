<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">
                Import your custom workouts from Zwift.
            </h5>
            <div class="card-text">
                <p>Find your workout files in <code>~/Zwift/{id}/*.zwo</code>and upload them here:</p>

                <form action="#">
                    <div class="form-group">
                        <input @change="onChange" type="file" name="file" id="file" class="form-control">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Import',
        data() {
            return {};
        },
        methods: {
            onChange(e) {
                const file = e.target.files[0];
                const reader = new FileReader();

                reader.onload = (e) => {
                    const text = e.target.result;
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(text, 'text/xml');

                    console.log(xml);

                    const json = {
                        author: xml.getElementsByTagName('author')[0].textContent,
                        name: xml.getElementsByTagName('name')[0].textContent,
                        description: xml.getElementsByTagName('description')[0].textContent,
                        sportType: xml.getElementsByTagName('sportType')[0].textContent,
                        tags: Array.from(xml.getElementsByTagName('tag')).map(tag => tag.getAttribute('name')),
                        workout: Array.from(xml.getElementsByTagName('workout')[0].children).map(element => { return { tag: element.tagName, attributes: Array.from(element.attributes).reduce((prev, curr) => { prev[curr.name] = curr.value; return prev; }, {}) } }),
                    }

                    console.log(json);

                    this.$emit('data', json);
                }

                reader.readAsText(file);
            }
        }
    }
</script>