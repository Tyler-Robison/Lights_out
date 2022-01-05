import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Board from './Board'

it("renders without crashing", function () {
    render(<Board />);
});

// there will be randomness if chanceLightStartsOn !== 0 or 1 .

it("matches snapshot with all lights on", function () {
    const { asFragment } = render(<Board chanceLightStartsOn={1.0} />);
    expect(asFragment()).toMatchSnapshot();
});

test("that correct cells flip upon click", function () {
    const { getByTestId } = render(<Board chanceLightStartsOn={1.0} />);

    const topLeftCell = getByTestId('0-0')
    const oneBelow = getByTestId('1-0')
    const oneToRight = getByTestId('0-1')
    const twoToRight = getByTestId('0-2')
    expect(topLeftCell).toHaveClass('Cell Cell-lit')
    expect(oneBelow).toHaveClass('Cell Cell-lit')
    expect(oneToRight).toHaveClass('Cell Cell-lit')
    expect(twoToRight).toHaveClass('Cell Cell-lit')
    fireEvent.click(topLeftCell)
    expect(topLeftCell).toHaveClass('Cell')
    expect(oneBelow).toHaveClass('Cell')
    expect(oneToRight).toHaveClass('Cell')
    expect(twoToRight).toHaveClass('Cell Cell-lit')
    fireEvent.click(twoToRight)
    expect(twoToRight).toHaveClass('Cell')
    expect(oneToRight).toHaveClass('Cell Cell-lit')
});

// start with unlit board, victory not allowed until clickCount > 0
// click same cell twice to achieve victory. 
// test("That we can detect win and display victory message", function () {
//     const { getByTestId } = render(<Board chanceLightStartsOn={0.0} />);
//     const topLeftCell = getByTestId('0-0');

//     // checking class of cell is for troubleshooting purposes only. 
//     expect(topLeftCell).toHaveClass('Cell')
//     fireEvent.click(topLeftCell);
//     expect(topLeftCell).toHaveClass('Cell Cell-lit')
//     fireEvent.click(topLeftCell);
//     expect(topLeftCell).toHaveClass('Cell')

//     const victoryPara = getByTestId('testVictoryPara')
//     expect(victoryPara).toHaveTextContent("You win");
// })

test("That we can detect win and display victory message", function () {
    const { getByTestId } = render(<Board nrows={1} ncols={3} chanceLightStartsOn={1.0} />);
    const middleCell = getByTestId('0-1');

    fireEvent.click(middleCell);

    const victoryPara = getByTestId('testVictoryPara')
    console.log('inner text: ', victoryPara.innerText)
    console.log('text content: ', victoryPara.textContent)
    // innerText contains expected text, textContent is blank
    // victoryPara textContent isn't blank in running app

    expect(victoryPara).toHaveTextContent("You win");
    expect(screen.getByText(`You win! Clicked 1 times`)).toBeInTheDocument()
    // above tests fail if text added via innerText

    // these 3 tests together show that victory para is in document
    // visible and contains correct text.
    // expect(victoryPara.innerText).toEqual('You win! Clicked 1 times')
    expect(victoryPara).toBeInTheDocument();
    expect(victoryPara).toBeVisible();

})

