import React from "react";
import Link from "next/link";
import commonStyles from "@/app/styles/top/TopCommon.module.css";
import TopPageTitle from "@/app/components/top/TopPageTitle";
import styles from "@/app/styles/top/TopIndustry.module.css";
import IndustryList from "@/app/components/top/TopIndusryList";

type Step = {
  label: string;
  path: string | null;
};

type IndustrySpecificSteps = {
  [key: string]: Step[];
};

// 共通のステップ定義
const COMMON_STEPS: Step[] = [
  { label: "開業計画", path: "open_plan" },
  { label: "事業計画 資金調達", path: "business_plan" },
  { label: "開業地物件 建築・内装", path: "property" },
  { label: "資格 許認可", path: "license" },
  { label: "スタッフ 募集・研修", path: "staff" },
  { label: "集客・販促", path: "promotion" },
  { label: "開 業", path: null },
];

// 業種ごとの追加ステップ
const INDUSTRY_SPECIFIC_STEPS: IndustrySpecificSteps = {
  ramen: [{ label: "厨房機器 什器・備品", path: "machine" }],
  cake: [{ label: "厨房機器 什器・備品", path: "machine" }],
  cafe: [{ label: "厨房機器 什器・備品", path: "machine" }],
  bakery: [{ label: "厨房機器 什器・備品", path: "machine" }],
  yakiniku: [{ label: "厨房機器 什器・備品", path: "machine" }],
  "soba-udon": [{ label: "厨房機器 什器・備品", path: "machine" }],
  italian: [{ label: "厨房機器 什器・備品", path: "machine" }],
  izakaya: [{ label: "厨房機器 什器・備品", path: "machine" }],
  flour: [{ label: "厨房機器 什器・備品", path: "machine" }],
};

// ステップを生成する関数
const generateFlowSteps = (industry: string) => {
  const baseUrl = `/kaigyo/openmap/${industry}`;
  const steps = [...COMMON_STEPS];

  // 業種固有のステップを挿入
  const specificSteps = INDUSTRY_SPECIFIC_STEPS[industry] || [];
  if (specificSteps.length > 0) {
    const insertIndex =
      steps.findIndex((step) => step.label === "開業地物件 建築・内装") + 1;
    steps.splice(insertIndex, 0, ...specificSteps);
  }

  return steps.map((step) => ({
    label: step.label,
    url: step.path ? `${baseUrl}/${industry}-${step.path}/` : null,
  }));
};

const TopIndustry = () => {
  return (
    <section className="industry-area">
      <div className="industry-top py-16">
        <TopPageTitle level={2} enText="INDUSTRY CLASSIFIED" className="mb-7">
          業種別開業支援
        </TopPageTitle>

        <div className={commonStyles.top_strong_txt}>
          <p>
            <span className={commonStyles.marker}>
              業種に合わせた開業を、
              <br className="sp-dis" />
              テンポスが道案内いたします。
            </span>
          </p>
        </div>
        <div className={`${commonStyles.top_txt} inner`}>
          <p>
            毎年たくさんの方が飲食店を新規に開業されています。飲食店経営には様々な困難が待ち受けており、毎年たくさんの方が閉店を余儀なくされています。
            <br />
            ライフスタイルの変化による消費者動向の変化、次々と移り変わるトレンド、次から次へと現れる競合相手など、問題は多々発生します。経営を続けていくには、時代や環境の変化に柔軟に対応していく必要があります。
          </p>
          <p>
            一口に&quot;飲食店&quot;といっても、業種によって必要な機器・設備はもちろん、市場動向や開業に必要な資金、向いている立地、必要な資格などが違います。
            <br />
            失敗しないためには、事前の準備がとても大切です。
          </p>
          <p>
            また、どの業態にも言えることは、&apos;コンセプト&apos;の重要性です。参入する業界の調査・分析をしっかりと行い、コンセプトを明確にしてから開業準備を進めてください。
          </p>
          <p>
            業種別に、各業態の特徴及び事業を成功へ導くためのポイントを、開業準備ルートに沿って、詳しくご説明・ご案内いたします。
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 inner gap-4">
          {[
            { label: "ラーメン店開業", anchor: "ramen" },
            { label: "ケーキ・スイーツ店開業", anchor: "cake" },
            { label: "カフェ開業", anchor: "cafe" },
            { label: "パン屋開業", anchor: "bakery" },
            { label: "焼肉店開業", anchor: "yakiniku" },
            { label: "そば・うどん店開業", anchor: "noodles" },
            { label: "イタリアン料理店開業", anchor: "italian" },
            { label: "居酒屋開業", anchor: "izakaya" },
            { label: "ホテル開業", anchor: "hotel" },
            { label: "粉もん屋開業", anchor: "flour" },
          ].map((item) => (
            <li key={item.anchor}>
              <Link
                href={`#link-${item.anchor}`}
                className={`${styles.industry_nav} ${styles[item.anchor]}`}
              >
                <span className={styles.industry_nav_span}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${styles.industryDescArea} py-16`}>
        <ul className="grid gap-y-12 inner">
          <IndustryList
            className="ramen"
            title="ラーメン店開業"
            descriptions={[
              "ラーメンは消費者人気が高く、メディアでも頻繁に取り扱われる人気業態です。需要の高さに加え、初期投資が他業態に比べて少なく済むため、新規開店が盛んな業態で、どこの町にも必ずと言っていいほどラーメンを扱う店舗はあります。 しかし、ラーメン屋を開業するメリットは大いにあります。",
              "ラーメン屋を開業するメリットは？何からはじめたらよいか？必要な資金は？必要な資格・許認可は？成功のポイントは？など、開業時の疑問を解決いたします。",
              "皆さまのご店舗が末永く繁盛されるよう、様々なサポートもご用意いたしております。",
            ]}
            flowSteps={generateFlowSteps("ramen")}
            detailLink="/kaigyo/openmap/ramen/"
            specialPageLink="https://www.tenpos.com/c/industry/ramen/"
          />
          <IndustryList
            className="cake"
            title="ケーキ・スイーツ店"
            descriptions={[
              "ケーキ・スイーツは、今は男性からの需要も高く、老若男女から愛されています。テイクアウト需要の拡大により、ケーキ・スイーツ業界の市場規模も伸びています。<br />しかし、ケーキ・スイーツ業界は、コンビニスイーツの台頭や、原材料や燃料費の上昇が続き、厳しい状況にもあります。",
              "ケーキ・スイーツ店を開業するメリットは？何からはじめたらよいか？必要な資金は？必要な資格・許認可は？成功のポイントは？など、開業時の疑問を解決いたします。",
              "皆さまのご店舗が末永く繁盛されるよう、様々なサポートもご用意いたしております。",
            ]}
            flowSteps={generateFlowSteps("cake")}
            detailLink="/kaigyo/openmap/cake/"
            specialPageLink="https://www.tenpos.com/c/industry/cake/"
          />
          <IndustryList
            className="cafe"
            title="カフェ"
            descriptions={[
              "近年、雑貨・ペット・コインランドリー・スポーツなど異業種と融合した「複合タイプ」など個性的なカフェが多数登場しています。開業形態も、一般的な『店舗型』のほか、古民家や自宅を改装した『自宅型』、キッチンカーなどでの『移動型』など、出店形態も自由度が高く、独自性の高い経営ができることがカフェ経営の魅力の一つです。<br />一方で、カフェ業態は、比較的低投資での開業が可能なため、競争率が高く、生き残りの厳しい業態です。",
              "カフェを開業するメリットは？何からはじめたらよいか？必要な資金は？必要な資格・許認可は？成功のポイントは？など、開業時の疑問を解決いたします。",
              "皆さまのご店舗が末永く繁盛されるよう、様々なサポートもご用意いたしております。",
            ]}
            flowSteps={generateFlowSteps("cafe")}
            detailLink="/kaigyo/openmap/cafe/"
            specialPageLink="https://www.tenpos.com/c/industry/cafe/"
          />
          <IndustryList
            className="bakery"
            title="パン屋"
            descriptions={[
              "パン業界の市場規模は、緩やかに上昇を続けており、パンの需要は伸びています。 特定のパンの専門店や、イートインのある店舗、夫婦で経営する小さな店舗など、様々なタイプのパン屋さんがあります。<br />しかし、原料費や燃料費の上昇が続き、パン業界では廃業件数は急増しています。",
              "パン屋を開業するメリットは？何からはじめたらよいか？必要な資金は？必要な資格・許認可は？成功のポイントは？など、開業時の疑問を解決いたします。",
              "皆さまのご店舗が末永く繁盛されるよう、様々なサポートもご用意いたしております。",
            ]}
            flowSteps={generateFlowSteps("bakery")}
            detailLink="/kaigyo/openmap/bakery/"
            specialPageLink="https://www.tenpos.com/c/industry/bread/"
          />
          <IndustryList
            className="yakiniku"
            title="焼肉店"
            descriptions={[
              "焼肉業態は、男女や年齢を問わず、ファミリーやグループ、カップル、お一人様など、幅広い客層に人気です。<br />ハレの日需要が高いので安定した集客が見込むことができ、客単価も高いのが特徴です。<br />しかし、焼肉業態は、コロナ過で出店が相次ぎ、競争が激しくなっています。また、飲食店の中でも開業資金が非常に高い部類に入ります。",
              "焼肉店を開業するメリットは？何からはじめたらよいか？必要な資金は？必要な資格・許認可は？成功のポイントは？など、開業時の疑問を解決いたします。",
              "皆さまのご店舗が末永く繁盛されるよう、様々なサポートもご用意いたしております。",
            ]}
            flowSteps={generateFlowSteps("yakiniku")}
            detailLink="/kaigyo/openmap/yakiniku/"
            specialPageLink="https://www.tenpos.com/c/industry/yakiniku/"
          />
          <IndustryList
            className="noodles"
            title="そば・うどん店"
            descriptions={[
              "そば・うどん屋は、廃業率が高く、店舗数は減少傾向にあります。一方で、そば・うどんの市場規模は増え続けています。ユネスコ無形文化遺産に「和食」が登録されたことにより、海外からも注目されるようになりました。地域性が高く、地域によって受け入れられやいメニューに差があることも特長の一つでしょう。<br />比較的初期投資額が低く、競合が減っているため、これから開業を考える方には大きなチャンスといえます。",
              "そば・うどん店を開業するメリットは？何からはじめたらよいか？必要な資金は？必要な資格・許認可は？成功のポイントは？など、開業時の疑問を解決いたします。",
              "皆さまのご店舗が末永く繁盛されるよう、様々なサポートもご用意いたしております。",
            ]}
            flowSteps={generateFlowSteps("soba-udon")}
            detailLink="/kaigyo/openmap/soba-udon/"
            specialPageLink="https://www.tenpos.com/c/industry/soba-udon/"
          />
          <IndustryList
            className="italian"
            title="イタリアン料理店"
            descriptions={[
              "イタリアン料理は、日本人にも人気が高い料理です。パスタやドリア、ピザなどのメニューは、ソースや具材でバリエーションを付けやすく、調理工程もシンプルなうえ、低原価高利益率が得られやすい魅力的な業態です。<br />大手チェーン店の参入も多く、専門店が多様化しているため、市場競争が激しい業態でもあります。",
              "イタリアン料理店を開業するメリットは？何からはじめたらよいか？必要な資金は？必要な資格・許認可は？成功のポイントは？など、開業時の疑問を解決いたします。",
              "皆さまのご店舗が末永く繁盛されるよう、様々なサポートもご用意いたしております。",
            ]}
            flowSteps={generateFlowSteps("italian")}
            detailLink="/kaigyo/openmap/italian/"
          />
          <IndustryList
            className="izakaya"
            title="居酒屋"
            descriptions={[
              "居酒屋業態は、利益率が高く、開業がしやすい業態と言われています。コロナ禍では、影響を大きく受けている業態でもあります。<br />立ち飲み、大衆酒場、創作居酒屋、個室居酒屋、テーマ型居酒屋、ご当地居酒屋など多種多様な居酒屋業態が存在しており、独創性の高い経営ができます。<br />コロナ禍によって、消費者動向が変化した今、経営を軌道に乗せるには入念な準備が必要です。",
              "居酒屋を開業するメリットは？何からはじめたらよいか？必要な資金は？必要な資格・許認可は？成功のポイントは？など、開業時の疑問を解決いたします。",
              "皆さまのご店舗が末永く繁盛されるよう、様々なサポートもご用意いたしております。",
            ]}
            flowSteps={generateFlowSteps("izakaya")}
            detailLink="/kaigyo/openmap/izakaya/"
            specialPageLink="https://www.tenpos.com/c/industry/izakaya/"
          />
          <IndustryList
            className="hotel"
            title="ホテル"
            descriptions={[
              "コロナが終息すれば、インバウンド需要も回復していくと考えられています。<br />2016年の許可基準の規制緩和以降、ホテル・簡易宿泊所の開業件数は増えており、競争が増しています。<br />宿のコンセプトも多様化し、様々なサービスをウリにした宿が登場しています。",
              "ホテル・簡易宿所を開業するメリットは？何からはじめたらよいか？必要な資金は？必要な資格・許認可は？成功のポイントは？など、開業時の疑問を解決いたします。",
              "皆さまのご店舗が末永く繁盛されるよう、様々なサポートもご用意いたしております。",
            ]}
            flowSteps={generateFlowSteps("hotel")}
            detailLink="https://www.tenpos.com/kaigyo/openmap/hotel/"
            specialPageLink="https://www.tenpos.com/c/industry/hotel/"
          />
          <IndustryList
            className="flour"
            title="粉もん屋"
            descriptions={[
              "粉もの（お好み焼き、たこ焼き、たい焼き）は、親しみやすく手軽に楽しめる日本のソウルフードとして、日本国内外で広く愛されています。<br />特に観光地などでの展開が盛んであり、外国人観光客にとっても魅力的な食事の選択肢となっています。",
              "市場の競争も激化しており、独自の味やコンセプト、サービスの提供が重視されています。<br />地域密着型の店舗からチェーン展開まで、様々な経営スタイルが見られる業界です。",
              "粉もの屋を開業するメリットは？何からはじめたらよいか？必要な資金は？必要な資格・許認可は？成功のポイントは？など、開業時の疑問を解決いたします。",
              "皆さまのご店舗が末永く繁盛されるよう、様々なサポートもご用意いたしております。",
            ]}
            flowSteps={generateFlowSteps("flour")}
            detailLink="https://www.tenpos.com/kaigyo/openmap/flour/"
          />
        </ul>
      </div>
    </section>
  );
};

export default TopIndustry;
