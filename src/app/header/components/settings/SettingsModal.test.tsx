import { fireEvent, render, screen } from "@testing-library/react";
import GameSettingsModal from "./SettingsModal";
import { initialState } from "../../../game/game.slice";

const mockSettings = initialState.settings;

describe("GameSettingsModal component", () => {
  it("renders correctly when open", () => {
    render(
      <GameSettingsModal
        settings={mockSettings}
        setSettings={jest.fn()}
        isOpen={true}
        onClose={jest.fn()}
        onSave={jest.fn()}
      />,
    );
    expect(screen.getByText("Game settings")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <GameSettingsModal
        settings={mockSettings}
        setSettings={jest.fn()}
        isOpen={false}
        onClose={jest.fn()}
        onSave={jest.fn()}
      />,
    );
    expect(screen.queryByText("Game settings")).toBeNull();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(
      <GameSettingsModal
        settings={mockSettings}
        setSettings={jest.fn()}
        isOpen={true}
        onClose={onClose}
        onSave={jest.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onSave and onClose when save button is clicked", () => {
    const onSave = jest.fn();
    const onClose = jest.fn();
    render(
      <GameSettingsModal
        settings={mockSettings}
        setSettings={jest.fn()}
        isOpen={true}
        onClose={onClose}
        onSave={onSave}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /save settings/i }));
    expect(onSave).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("updates settings when input values change", () => {
    const setSettings = jest.fn();
    render(
      <GameSettingsModal
        settings={mockSettings}
        setSettings={setSettings}
        isOpen={true}
        onClose={jest.fn()}
        onSave={jest.fn()}
      />,
    );
    fireEvent.change(screen.getByLabelText(/number of pair of cards/i), {
      target: { value: "10" },
    });
    expect(setSettings).toHaveBeenCalledWith({
      ...mockSettings,
      cardPairsCount: 10,
    });
  });
});
