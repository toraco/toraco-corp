import { Section } from '@/components/ui/Section';
import { Typography } from '@/components/ui/Typography';

import styles from './About.module.scss';

export const About = () => {
  return (
    <Section id="about" title="About">
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>社名</th>
              <td>toraco株式会社（toraco, Inc.）</td>
            </tr>
            <tr>
              <th>設立</th>
              <td>2021年4月23日</td>
            </tr>
            <tr>
              <th>事業内容</th>
              <td>
                <ul>
                  <li>Webアプリケーション・システムの設計・開発・保守・運用</li>
                  <li>エンジニア向けコミュニティの運営</li>
                  <li>YouTubeチャンネル運営</li>
                </ul>
              </td>
            </tr>
            <tr>
              <th>代表者</th>
              <td>稲垣 貴映</td>
            </tr>
            <tr>
              <th>従業員数</th>
              <td>3名</td>
            </tr>
            <tr>
              <th>所在地</th>
              <td>
                〒101-0041
                <br />
                東京都千代田区神田須田町2丁目2-2 神田須田町ビル8階
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  );
};
