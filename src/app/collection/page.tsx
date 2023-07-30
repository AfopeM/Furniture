import collectionData from "@/../public/data/collection.json";
import { Hero, Title, CollectionCards, BlogCards } from "@/components";

export default function Collection() {
  const { collections, blogs } = collectionData;
  return (
    <>
      <Hero title="Our Collection" />
      <main className="space-y-16">
        {/* COLLECTION TAGLINE */}
        <div className="brand-px bg-brand-dark/10 py-12">
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

        {/* BLOGS SECTION */}
        <section className="brand-px space-y-16">
          <div className="rounded-xl bg-brand-dark/10 px-8 py-12 text-center">
            <Title textSize="text-3xl" colour="text-brand-dark" extra="mx-auto">
              Our Blog
            </Title>
            <p className="mx-auto pt-2 max-w-md font-fira font-light text-brand-dark/50">
              Our blog is a source of inspiration and information, featuring
              expert advice, design tips, and behind-the-scenes glimpses of our
              brand
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-16">
            {blogs.map((blog, i) => {
              return (
                <BlogCards {...blog} index={i} key={`${i}${blog.title}`} />
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
