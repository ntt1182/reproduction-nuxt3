import * as qs from "qs";
export const useHomepage = async () => {
  try {
    const config = useRuntimeConfig().public;
    const query = qs.stringify({
      populate: [
        "blocks.seo",
        "blocks.image",
        "seo",
        "seo.image",
        "seo.optionals",
        "blocks.cta",
        "blocks.firstImage",
        "blocks.secondImage",
        "blocks.thirdImage",
        "blocks.details",
        "blocks.details.media",
        "blocks.details.jsonImage",
        "blocks.technologies.image",
        "blocks.contactDetails",
        "blocks.projects",
        "blocks.projects.carouselImage",
        "blocks.projects.technologies",
        "blocks.projects.hashTags",
        "blocks.modalError",
        "blocks.modalSuccess",
        "blocks.imageJSON",
        "*",
      ],
    });
    console.log(`Calling https://api.staging.deevotech.com/api/homepage?${query}`);
    const { data } = await useFetch(
      `https://api.staging.deevotech.com/api/homepage?${query}`,
      {
        transform: (response: any) => {
          try {
            return {
              blocks: response.data?.attributes?.blocks.map((block) => {
                return {
                  ...block,
                  componentName: block.__component
                    .split(".")
                    .map((str) => {
                      const newStr = str
                        .split("-")
                        .map((w) => `${w[0].toUpperCase()}${w.substr(1)}`)
                        .join("");
                      return newStr[0].toUpperCase() + newStr.substr(1);
                    })
                    .join(""),
                };
              }),
              seo: response.data?.attributes?.seo,
            };
          } catch (err) {
            console.log(err);
          }
        },
      }
    );

    return {
      homepage: data,
    };
  } catch (error) {
    console.log(error);
  }
};
