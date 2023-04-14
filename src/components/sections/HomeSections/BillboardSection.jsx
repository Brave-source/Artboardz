
const BillboardSection = () => {
  return (
    <section className="text-white font-Montserrat mt-[8px]  font-medium mb-8 lg:mb-[60px] mr-[8px] ml-[8px]">
      <article className="space-y-5">
      <div className="">
          <iframe
            className="  h-[25vh] sm:h-[60vh] sm:w-full aspect-video  mx-auto rounded-lg "
            src="https://www.youtube.com/embed/2RS1lDA3jFs"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <h1 className="  text-[20px] font-semibold sm:text-[40px] text-center tracking-wide px-3">
          Replacing Billboards with Art
        </h1>

        <p className="text-center text-base tracking-wide text-[14px] sm:text-[18px] max-w-[1192px] mx-auto">
          Artboardz works with street artists to combine NFT art with physical
          art to beautify cities, replacing billboards with art. This innovative
          approach is tailored to support artists in the onboarding process
          bringing them into the digital ecosystem, promoting their art, and
          helping brand Cardano simultaneously. These initiatives are fully
          funded through the sale of Cardano NFTs, and royalties go to the
          artists.
        </p>

        <p className="text-center text-base tracking-wide text-[14px] sm:text-[18px] max-w-[1192px] mx-auto">
          Through NFTs, local artists can access global buyers and collectors to
          bring color and life to their cities with street art. While physical
          images might disappear one day, the digital versions will always
          survive, allowing the owners to enjoy their beauty and the artist to
          receive royalties on sales, which they were never able to do before.
        </p>
      </article>
    </section>
  );
};

export default BillboardSection;
