<script>
	export let name;
	name = "Emily";

	export let image1 = 'images/image1.jpg';
	export let image2 = 'images/image2.jpg';
	export let image3 = 'images/image2-diff.jpg';
	let site = 'www.google.com'


	const theURL = `http://localhost:8181/api/1/puppeteer/?id=01`;

      const controller = new AbortController();
      //abort fetch if it takes longer than 60 seconds.
      setTimeout(() => {controller.abort()}, 60000)

      fetch(theURL, {signal: controller.signal})
        .then((res) => res.blob())
        .then(async (image) => {
          //const myFile = new File([image], "thumbnail.jpg", { type: image.type });
		  const imageUrl = window.URL.createObjectURL(image)
		  image2 = imageUrl;
		  fetch(`http://localhost:8181/compare?id=01`).then((res) => {
			  image3 = `images/01-diff.jpg`
		  })

        })

        .catch((ee) => {
          console.log(ee)
		});
    

</script>

<main>

	<h1>Hello {name}!</h1>
	Current
	<img src={image1} alt />
	New image
	<img src={image2} alt />
	{#if image3}
	<img src={image3} alt />
	{/if}
	
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>