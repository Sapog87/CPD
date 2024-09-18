import {Cache} from "../src/cache";

test("test1", () => {
    const cache = new Cache();
    cache.put("key1", "value", 2);
    expect(cache.get("key1")).toBe("value");
    expect(cache.get("key1")).toBe("value");
    expect(cache.get("key1")).toBe(null);
})

test("test2", () => {
    const cache = new Cache();
    expect(cache.get("key1")).toBe(null);
})

test("test3", () => {
    const cache = new Cache();
    cache.put("key1", "value");
    expect(cache.get("key1")).toBe("value");
    cache.put("key1", "value1");
    expect(cache.get("key1")).toBe("value1");
})

test("test4", () => {
    const cache = new Cache();
    cache.put("key1", "value", 3);
    cache.get("key1");
    cache.get("key1");
    expect(cache.stats()).toEqual([{key:"key1", value:"value", count:2}, {key:"key1", value:"value", count:1}]);
})

test("test5", () => {
    const cache = new Cache();
    cache.put("key1", "value");
    expect(cache.get("key1")).toBe("value");
    expect(cache.get("key1")).toBe(null);
})

test("test6", () => {
    const cache = new Cache();
    cache.put("key1", "value", -1);
    expect(cache.get("key1")).toBe(null);
})