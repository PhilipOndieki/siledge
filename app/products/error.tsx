"use client";

import { useEffect } from "react";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Button } from "@/components/primitives/Button";
import { getUiCopy } from "@/lib/content/queries";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const ui = getUiCopy();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <Heading level={1}>{ui.productsErrorBoundary.heading}</Heading>
      <p className="max-w-prose text-siledge-slate">{ui.productsErrorBoundary.body}</p>
      <Button onClick={reset}>{ui.buttons.tryAgain}</Button>
    </Container>
  );
}
