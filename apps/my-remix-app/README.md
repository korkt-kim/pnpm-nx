1. apps에 npx create-remix@latest
2. package.json에 name설정
3. pnpm --filter=name install, pnpm --filter=name dev, pnpm --filter=name add package
4. 공용으로 사용할 package를 packages에 폴더로 생성. 이후 pnpm init.
5. package의 package.json을 private로 설정한다.
6. 필요한 컴포넌트를 생성하며 index.tsx내 export 설정을 한다.
  - typescript 프로젝트 일 때 typescript 개별 설치 및 tsconfig 설정을 한다.
  - framework또한 따로 관리해야한다
  - package.json main을 dist/index.js로 변경한다
7. shared ui build하면 dist에 생성된다.
8. pnpm add shared-ui --filter my-remix-app --workspace 하면 app에 shared ui dependency가 생긴다
9. pnpm run (--parallel) -r build 하면 dependency기반으로 모든 project가 build된다.

-----
1. pnpm add nx -D -w. main package.json에 nx가 설치된다.
2. npx nx build shared-ui -> pnpm대신 사용할 수 있다.
----
caching
1. touch nx.json
```
{
    "tasksRunnerOptions":{
        "default":{
            "runner":"nx/tasks-runners/default",
            "options":{
                "cacheableOperations": ["build"]
            }
        }
    }
}
```
2. 이후 npx nx build shared-ui할때 코드 변경이 없었다면 캐싱된다.
3. 캐시 ignore파일을 설정할 수있다. 주로 reademe.md가 그렇다
₩₩₩
"targetDefaults":{
        "namedInputs": { "noMarkdown": ["!{projectRoot}/**/*.md"]} 
        "build":{
            "inputs":["!{projectRoot}/**/*.md"] or ["noMarkdown", "^noMarkdown"]
        }
    }
₩₩₩

----
- package의 dist를 지우면 index.js를 찾지못해 에러가 발생한다.
1. nx.json에 다음과 같이 설정하여 build할때나 dev할때 dependency package build를 돌리도록 한다.
```
"build":{
    "inputs":["!{projectRoot}/**/*.md"],
    "dependsOn":["^build"]
},
"dev":{
    "dependsOn": ["^build"]
},
```
----
- 변경이 있는 package에만 command를 입력해야할 때가 있다.
npx nx affected:build : dependency에 근거한 build만 진행한다.
my-custom-features는 빌드가 안되는 것이다.
npx nx run-many --target=build --all: 다 빌드한다.