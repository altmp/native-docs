import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Plugin } from "vite";

function hashFile(filePath: string): string {
  const data = fs.readFileSync(filePath);
  const hash = crypto.createHash("sha256").update(data).digest("hex");
  return hash;
}

interface ParamsObject {
  name: string;
  type: string;
}

function getJSType(type: string): string {
  return type
    .replace(/int\s*\*/, "int")
    .replace(/BOOL\s*\*/, "boolean")
    .replace(/const char\s*\*/, "string")
    .replace(/char\s*\*/, "string")
    .replace(/float\s*\*/, "float")
    .replace(/float/, "float")
    .replace(/int/, "int")
    .replace(
      /(Player|Hash|Any|Entity|FireId|Ped|Vehicle|Cam|CarGenerator|Group|Train|Pickup|Object|Weapon|Interior|Blip|ScrHandle)\s*\*/,
      "$1",
    )
    .replace(/Vector3\s*\*/, "Vector3")
    .replace("BOOL", "boolean")
    .replace("void*", "MemoryBuffer");
}

function getTypingsReturn(args: ParamsObject[], result: string) {
  const jsType = getJSType(result);
  if (jsType.indexOf("*") != -1) console.error(result);

  const toReturn = [jsType];
  for (let i = 0; i < args.length; ++i) {
    const argType = args[i].type;
    if (argType.indexOf("char") === -1 && argType.indexOf("*") !== -1) {
      toReturn.push(getJSType(argType));
    }
  }
  if (toReturn.length === 1) return jsType;
  else {
    return `[${toReturn.join(", ")}]`;
  }
}

function getHandledNatives(nativesContent: string): unknown {
  const nativesJSON = JSON.parse(nativesContent);
  for (const cat in nativesJSON) {
    for (const nHash in nativesJSON[cat]) {
      const native = nativesJSON[cat][nHash];

      const result = getTypingsReturn(native.params, native.results);
      native.results = result;

      for (let i = 0; i < native.params.length; ++i) {
        const param = native.params[i];
        if (param.name === "var") param.name = "unkVar";
        param.ref = param.type.includes("*") && !param.type.includes("char");
        const jsType = getJSType(param.type);
        param.type = jsType;
      }
    }
  }
  return nativesJSON;
}

const nativeHashPlugin: () => Plugin = () => {
  return {
    name: "native-hash-plugin",
    configureServer(server) {
      const nativesFilePath = path.resolve(process.cwd(), "data/natives.json");

      server.middlewares.use("/version.json", (req, res) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify(
            {
              hash: hashFile(nativesFilePath),
            },
            null,
            2,
          ),
        );
      });

      server.middlewares.use("/natives.json", (req, res) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        const fileContent = fs.readFileSync(nativesFilePath, "utf-8");
        const handledNatives = getHandledNatives(fileContent);
        res.end(JSON.stringify(handledNatives, null, 2));
      });
    },

    writeBundle() {
      const nativesFilePath = path.resolve(process.cwd(), "data/natives.json");
      const distDir = path.resolve(process.cwd(), "dist");
      const hash = hashFile(nativesFilePath);
      const versionData = {
        hash,
      };

      const nativesContent = fs.readFileSync(nativesFilePath, "utf-8");
      fs.writeFileSync(
        path.join(distDir, "natives.json"),
        JSON.stringify(getHandledNatives(nativesContent), null, 2),
        "utf-8",
      );

      fs.writeFileSync(
        path.join(distDir, "version.json"),
        JSON.stringify(versionData, null, 2),
      );
    },
  };
};

export default nativeHashPlugin;
