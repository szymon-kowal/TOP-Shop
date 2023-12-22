import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useFetchCategories from "../src/client/assets/components/hooks/useFetchCategories";
import { renderHook, waitFor } from "@testing-library/react";

const mockData: string[] = ["test1cat", "test2cat"];
const mockUrl: string = "https://example.com/api";

const axiosMockInstance = new MockAdapter(axios);

describe("useFetchCategories", () => {
  beforeEach(() => {
    axiosMockInstance.reset();
  });
  test("it returns correct data before and after fetch", async () => {
    axiosMockInstance.onGet(mockUrl).reply(200, mockData);

    const { result } = renderHook(() => useFetchCategories(mockUrl));

    expect(result.current.data).toEqual([]);

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });
  });
  test("it correctly handles error on fetch", async () => {
    axiosMockInstance.onGet(mockUrl).networkError();

    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useFetchCategories(mockUrl));

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });

    consoleLogSpy.mockRestore();
  });
});
