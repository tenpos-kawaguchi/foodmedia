import Link from 'next/link';
import styles from '@/app/styles/top/TopIndustryList.module.css';
import commonStyles from '@/app/styles/top/TopCommon.module.css';
import ButtonSmall from '@/app/components/common/button/ButtonSmall';
import ToggleContent from '../common/toggle/ToggleContent';
import Button from '../common/button/Button';

type FlowStep = {
  label: string;
  url: string | null;
};

type IndustryListProps = {
  className: string;
  title: string;
  descriptions: string[];
  flowSteps: FlowStep[];
  detailLink: string;
  specialPageLink?: string;
};

export const IndustryList = ({
  className,
  title,
  descriptions,
  flowSteps,
  detailLink,
  specialPageLink,
}: IndustryListProps) => {
  return (
    <li className={`${styles[className]} relative py-10 px-[4%] bg-white`} id={`link-${className}`}>
      <div className={styles.industryDescTop}>
        <h3 className={styles.industryName}>{title}開業</h3>
        <div className={commonStyles.top_txt}>
          {descriptions.map((text, i) => (
            <p
              key={i}
              dangerouslySetInnerHTML={{
                __html: text.replace(/\n/g, '<br />'),
              }}
            />
          ))}
        </div>
      </div>

      <ToggleContent toggleButtonText="開業支援フロー図" className={styles.flow_img}>
        <div className="sp-toggle-contents">
          <ul className={styles.industryFlow}>
            {flowSteps.map((step, i) => (
              <li key={i}>
                {step.url ? (
                  <Link href={`https://www.tenpos.com${step.url}`}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: step.label.replace(' ', '<br class="pc" />'),
                      }}
                    />
                  </Link>
                ) : (
                  <span>{step.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </ToggleContent>

      <ul className={styles.industryLink}>
        <li className={styles.map}>
          <Link href={detailLink}>
            <Button color={'red'} size={'sm'}>
              開業の流れを詳しく見る
            </Button>
          </Link>
        </li>
        {specialPageLink ? (
          <li className={styles.ec}>
            <Link
              className="click_main_special"
              href={specialPageLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button color={'blue'} size={'sm'}>
                {title}専門ページ
              </Button>
            </Link>
          </li>
        ) : (
          ''
        )}
      </ul>
    </li>
  );
};

export default IndustryList;
