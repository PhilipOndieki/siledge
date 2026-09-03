export const uiData = {
  nav: {
    home: "Home",
    about: "About",
    products: "Products",
    contact: "Contact",
  },
  hero: {
    ctaLabel: "Explore our products",
  },
  buttons: {
    viewAllProducts: "View all products",
    sendMessage: "Send message",
    sending: "Sending…",
    tryAgain: "Try again",
    backHome: "Back to home",
  },
  productsEmptyState: {
    heading: "No products listed in this category yet",
    body: "We are still populating this category. Browse the full catalogue instead.",
  },
  notFound: {
    heading: "Page not found",
    body: "The page you are looking for does not exist or has moved.",
  },
  errorBoundary: {
    heading: "Something went wrong",
    body: "This page hit an unexpected error. You can try again or head back to the homepage.",
  },
  productsErrorBoundary: {
    heading: "Products could not be loaded",
    body: "There was a problem loading the product catalogue. You can try again.",
  },
  form: {
    fields: {
      name: "Full name",
      email: "Email address",
      phone: "Phone number",
      company: "Company",
      message: "Message",
    },
    errors: {
      nameRequired: "Enter your full name.",
      emailInvalid: "Enter a valid email address.",
      messageRequired: "Enter a message of at least 10 characters.",
      messageTooLong: "Message must be under 2000 characters.",
    },
    status: {
      success: "Thank you. Your message has been sent and our team will respond shortly.",
      error: "Something went wrong sending your message. Please try again or call us directly.",
    },
  },
} as const;
