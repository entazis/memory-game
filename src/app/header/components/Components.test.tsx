import { render, screen } from "@testing-library/react";
import { Ended, Logo } from "./";

describe("Ended and Logo components", () => {
  it("renders the logo image", () => {
    render(<Logo />);
    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });

  it("applies the correct CSS class to the logo container", () => {
    const { container } = render(<Logo />);
    //TODO ESLint: Avoid direct Node access. Prefer using the methods from Testing Library.(testing-library/ no-node-access)
    expect(container.firstChild).toHaveClass("logo");
  });

  it("renders 'won' when endedAt is not null and won is true", () => {
    render(<Ended endedAt={Date.now()} won={true} />);
    expect(screen.getByText("won")).toBeInTheDocument();
  });

  it("renders 'lost' when endedAt is not null and won is false", () => {
    render(<Ended endedAt={Date.now()} won={false} />);
    expect(screen.getByText("lost")).toBeInTheDocument();
  });

  it("renders nothing when endedAt is null", () => {
    const { container } = render(<Ended endedAt={null} won={false} />);
    expect(container).toBeEmptyDOMElement();
  });
});
