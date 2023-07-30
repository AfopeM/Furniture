import { Hero, Title, CollectionCards } from "@/components";
import collectionData from "@/../public/data/collection.json";

export default function Collection() {
  const { collections, blogs } = collectionData;
  return (
    <>
      <Hero>
        <h1
          className="text-5xl font-bold uppercase tracking-tight 
          md:text-6xl lg:text-8xl"
        >
          Our Collection
        </h1>
      </Hero>
      <main>
        {/* COLLECTION TAGLINE */}
        <div className="brand-px bg-brand-dark/10 py-12 mb-10">
          <Title
            textSize="text-3xl md:text-4xl"
            colour="text-brand-dark"
            extra="text-center max-w-sm md:max-w-2xl mx-auto"
          >
            Explore our collection and discover the epitome of luxury
          </Title>
        </div>

        {/* COLLECTION SECTION */}
        <section className="brand-px flex flex-col gap-16">
          {collections.map((collect, i) => {
            return (
              <CollectionCards
                key={`${i}${collect.title}`}
                {...collect}
                index={i}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}
