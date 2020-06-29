import React from "react";
import { render } from "@testing-library/react";
import PokeList from "./PokeList";
import { HashRouter, Route } from "react-router-dom";

const renderComponent = () =>
  render(
      <HashRouter>
        <Route path="/"
        >
            <PokeList
                  items={
                      [
                          { url: "", name: "" },
                          { url: "", name: "" },
                      ]
                  }
                next={() => {}}
                previous={() => {}}
            />
        </Route>
  </HashRouter>
  );

test("renders component", () => {
    const { getByTestId } = renderComponent();
    const comp = getByTestId("poke-list");
    expect(comp).toBeDefined();
});


test("renders items", () => {
    const { getAllByTestId } = renderComponent();
    const items = getAllByTestId("item");
    expect(items).toHaveLength(2);
});