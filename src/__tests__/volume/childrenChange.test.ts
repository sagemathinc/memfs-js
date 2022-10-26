import { Volume } from "../../volume";

describe("adding or removing a path from a directory updates the modification time (see https://github.com/sagemathinc/memfs-js/issues/4)", () => {
  it("updates the mod time", (done) => {
    const vol = new Volume();
    vol.mkdirSync("/dir");
    const s = vol.statSync("/dir");
    setTimeout(() => {
      vol.mkdirSync("/dir/x");
      const s2 = vol.statSync("/dir");
      expect(s2.atime.valueOf()).toBe(s.atime.valueOf());
      expect(s2.mtime.valueOf()).toBeGreaterThan(s.mtime.valueOf());
      expect(s2.ctime.valueOf()).toBeGreaterThan(s.ctime.valueOf());
      expect(s2.mtime.valueOf()).toBe(s2.ctime.valueOf());
      done();
    }, 1);
  });
});
