import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Button } from "@/components/primitives/Button";
import { getUiCopy } from "@/lib/content/queries";

export default function NotFound() {
  const ui = getUiCopy();

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <Heading level={1}>{ui.notFound.heading}</Heading>
      <p className="max-w-prose text-siledge-slate">{ui.notFound.body}</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button href="/">{ui.buttons.backHome}</Button>
        <Button href="/products" variant="secondary">
          {ui.nav.products}
        </Button>
      </div>
    </Container>
  );
}
