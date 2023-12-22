import { waitFor, renderHook } from "@testing-library/react";
import useFetchData from "../src/client/assets/components/hooks/useFetchData";
import type { Item } from "../src/client/assets/components/interfaces";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockData: Item[] = [
  {
    id: "1",
    title: "test1",
    price: "price1",
    description: "description1",
    category: "test",
  },
  {
    id: "2",
    title: "test2",
    price: "price2",
    description: "description2",
    category: "test2",
  },
];

const mockUrl: string = "https://example.com/api";

const axiosMockInstance = new MockAdapter(axios);

describe("useFetchData test", () => {
  afterEach(() => {
    axiosMockInstance.reset();
  });
  test("it returns correct data and pageState before and after fetching", async () => {
    axiosMockInstance.onGet(mockUrl).reply(200, mockData);
    // return what we got if we go to specific url

    const { result } = renderHook(() => useFetchData(mockUrl));

    expect(result.current.data).toEqual([]);
    expect(result.current.pageState).toEqual("loading");

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
      expect(result.current.pageState).toEqual("done");
    });
  });

  test("on Error returns correct pageState", async () => {
    axiosMockInstance.onGet(mockUrl).networkError();
    // Mock console.log to do nothing
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useFetchData(mockUrl));

    expect(result.current.data).toEqual([]);
    expect(result.current.pageState).toEqual("loading");

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
      expect(result.current.pageState).toEqual("error");
    });

    // Restore the original console.log implementation
    consoleLogSpy.mockRestore();
  });
});
