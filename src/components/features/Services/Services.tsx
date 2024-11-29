import { Section } from '@/components/ui/Section';
import { Typography } from '@/components/ui/Typography';

import { ServiceCard } from './ServiceCard';
import { ServiceGroup } from './ServiceGroup';
import { ServiceList } from './ServiceList';
import styles from './Services.module.scss';

export const Services = () => {
  return (
    <Section id="services" variant="dark">
      <Typography variant="h2" className={styles.sectionTitle}>
        Services
      </Typography>

      <ServiceGroup title="得意とする開発" icon="code-box-line" useGrid>
        <ServiceCard title="Webアプリケーション・システム開発">
          <div className={styles.serviceContent}>
            <Typography variant="p" className={styles.description}>
              お客様のビジネスニーズに合わせた最適なWebソリューションを提供します。一般消費者向けのWebサービスから、企業向けSaaS、社内システムまで、幅広い開発実績があります。
            </Typography>
            <div className={styles.features}>
              <div className={styles.feature}>
                <i className="ri-user-smile-line" />
                <div>
                  <h4>toC向けWebサービス</h4>
                  <p>ユーザー体験を重視した、魅力的なWebサービスを構築</p>
                </div>
              </div>
              <div className={styles.feature}>
                <i className="ri-building-line" />
                <div>
                  <h4>toB向けSaaS</h4>
                  <p>
                    業務効率を向上させる、スケーラブルなSaaSプラットフォーム
                  </p>
                </div>
              </div>
              <div className={styles.feature}>
                <i className="ri-dashboard-line" />
                <div>
                  <h4>社内システム・管理画面</h4>
                  <p>業務フローに最適化された、使いやすい管理システム</p>
                </div>
              </div>
            </div>
          </div>
        </ServiceCard>

        <ServiceCard title="Webサイト高速化">
          <div className={styles.serviceContent}>
            <Typography variant="p" className={styles.description}>
              ユーザー体験とSEOの両面で重要なWebサイトのパフォーマンス改善を実現します。最新のフロントエンド技術とCDNを活用し、高速で快適なWebサイトを構築します。
            </Typography>
            <div className={styles.features}>
              <div className={styles.feature}>
                <i className="ri-code-box-line" />
                <div>
                  <h4>モダンフロントエンド技術</h4>
                  <p>Next.js、React等を活用した最適化</p>
                </div>
              </div>
              <div className={styles.feature}>
                <i className="ri-global-line" />
                <div>
                  <h4>CDNの活用</h4>
                  <p>世界中どこでも高速なアクセスを実現</p>
                </div>
              </div>
              <div className={styles.feature}>
                <i className="ri-speed-up-line" />
                <div>
                  <h4>改善点の調査分析</h4>
                  <p>詳細なパフォーマンス分析と改善提案</p>
                </div>
              </div>
            </div>
          </div>
        </ServiceCard>

        <ServiceCard title="ラボ型開発">
          <div className={styles.serviceContent}>
            <Typography variant="p" className={styles.description}>
              プロジェクトの規模や要件に応じて、必要なスキルを持つチームメンバーを柔軟に組み合わせ、高品質な開発を実現します。単なる人材派遣ではなく、チームとして成果を出すことにこだわります。
            </Typography>
            <div className={styles.features}>
              <div className={styles.feature}>
                <i className="ri-team-line" />
                <div>
                  <h4>チーム一体での開発</h4>
                  <p>PM、エンジニア、デザイナーが連携</p>
                </div>
              </div>
              <div className={styles.feature}>
                <i className="ri-shield-check-line" />
                <div>
                  <h4>品質の担保</h4>
                  <p>チームでのレビューと品質管理</p>
                </div>
              </div>
              <div className={styles.feature}>
                <i className="ri-money-dollar-circle-line" />
                <div>
                  <h4>柔軟な料金体系</h4>
                  <p>稼働量に応じた料金設定（最低20万円〜）</p>
                </div>
              </div>
            </div>
          </div>
        </ServiceCard>
      </ServiceGroup>

      <div className={styles.communityAndYoutube}>
        <ServiceGroup title="エンジニア向けコミュニティ" icon="discord-line">
          <ServiceCard>
            <div className={styles.communityContent}>
              <Typography variant="p" className={styles.description}>
                218名が参加する無料のエンジニアコミュニティです。技術情報の共有や議論、オンライン・オフラインでの交流を通じて、エンジニアの成長をサポートします。
              </Typography>
              <ServiceList
                items={[
                  'オンライン上でのもくもく会・作業ラジオ・雑談',
                  'オフラインイベント (LT会や飲み会）の案内 🍻',
                  '副業 / 業務委託案件の紹介 💁‍♀️',
                  '技術情報のシェア・議論 🤝',
                  '今後投稿する YouTube 動画の解説や質問回答',
                ]}
              />
              <a
                href="https://discord.gg/pxfMjDfsge"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.joinButton}
              >
                <i className="ri-discord-line" /> コミュニティに参加する
              </a>
            </div>
          </ServiceCard>
        </ServiceGroup>

        <ServiceGroup title="YouTubeチャンネルの運営" icon="youtube-line">
          <ServiceCard>
            <div className={styles.communityContent}>
              <Typography variant="p" className={styles.description}>
                代表の稲垣が中心となり、YouTubeチャンネル「とらゼミ」にて実践的な技術講座を提供しています。毎週金曜日の更新で、最新のテクノロジートレンドや実務で役立つ開発手法を分かりやすく解説しています。
              </Typography>
              <div className={styles.topics}>
                <div className={styles.topic}>
                  <i className="ri-code-box-line" />
                  <div>モダンフロントエンド</div>
                </div>
                <div className={styles.topic}>
                  <i className="ri-server-line" />
                  <div>API開発</div>
                </div>
                <div className={styles.topic}>
                  <i className="ri-robot-line" />
                  <div>生成AI開発</div>
                </div>
              </div>
              <ServiceList
                items={[
                  '毎週金曜日に新しい動画を公開',
                  'ハンズオン形式で実践的なコーディング解説',
                  '最新技術のトレンド解説',
                ]}
              />
              <a
                href="https://www.youtube.com/@1492tiger"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.youtubeButton}
              >
                <i className="ri-youtube-line" /> チャンネルを見る
              </a>
            </div>
          </ServiceCard>
        </ServiceGroup>
      </div>
    </Section>
  );
};
