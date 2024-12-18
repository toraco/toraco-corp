## Deployment

### ローカルから

1. `npx wrangler login` で Cloudflare にログイン
2. `yarn deploy` で build と deploy を行う

### Cloudflare Pages に Git 接続

GitCloudflare Pages に Git リポジトリを接続して新規作成することを推奨する。  
ローカルのバージョンに合わせて以下を設定しておくこと。

1. package.json
   ```json
   {
     "packageManager": "yarn@1.22.21"
   }
   ```
2. .node-version
   ```
   20.10.0
   ```
