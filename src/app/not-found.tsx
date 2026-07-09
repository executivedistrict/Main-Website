import { Button, Container, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section className="py-28 text-center sm:py-36">
      <Container>
        <p className="eyebrow-label">404</p>
        <h1 className="display-l mt-4 text-navy">
          This page isn&rsquo;t here.
        </h1>
        <p className="mx-auto mt-5 max-w-[46ch] text-lg text-slate">
          The page you were looking for moved or never existed.
        </p>
        <div className="mt-8">
          <Button href="/">Back to home</Button>
        </div>
      </Container>
    </Section>
  );
}
