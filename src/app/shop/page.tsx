import { Hero, Title, Filter } from "@/components";

export default function Shop() {
  return (
    <>
      <Hero title="Our Shop" />
      <main className="space-y-8">
        <section className="brand-px bg-brand-dark/10 py-8">
          <Title textSize="text-4xl" colour="text-brand-dark" extra="pb-2">
            Decorate your Home
          </Title>
          <p className="font-fira font-light text-brand-dark/50">
            We believe that every home should be a reflection of the
            individual&apos;s unique style and personality, and our shop does
            that.
          </p>
        </section>
        <Filter />
      </main>
    </>
  );
}
