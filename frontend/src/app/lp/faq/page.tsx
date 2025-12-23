'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSection {
  title: string
  items: FAQItem[]
  isContact?: boolean
  isAlwaysOpen?: boolean
}

const faqData: FAQSection[] = [
  {
    title: 'サービス全体について',
    items: [
      {
        question: 'nomocaって何？',
        answer: '高松市を中心に"ちょい飲み"を楽しめる月額制（サブスク）サービスです。掲載店で提示すると「各店舗につき1日に1杯の対象ドリンクが無料」になり（※対象ドリンクや条件等は店舗・キャンペーンにより異なります）、地域ポイント「たまポン」の還元施策とも連動する場合があります。掲載費は店舗無料、ユーザーは月額課金で利用できます。'
      },
      {
        question: '料金は？',
        answer: '月額 一般価格：980円、マイデジ会員価格：480円。今後は、6か月・12か月分をまとめて購入できるパッケージや観光客向けのショートプラン（３Days）などを販売する予定です。'
      },
      {
        question: '目的は？',
        answer: '背景として酒類出荷の長期減少傾向や若年層の飲酒頻度低下が指摘されています。飲食業界の活性化、若年層の"ちょい飲み"機会づくり、観光・来街促進などを目的としています。'
      },
      {
        question: 'だれが運営？出資・連携は？',
        answer: '株式会社つなぐが運営。高松市、J:COM、JTB、イオンフィナンシャルサービス、埼玉りそな銀行、武蔵野銀行、埼玉縣信用金庫、たかまつ商工会議所等が出資・連携しております（商連は出資なし）。最新の構成は高松市みんなのアプリの公式サイト等をご確認ください。'
      }
    ]
  },
  {
    title: 'ユーザー向け',
    items: [
      {
        question: '利用する際のルールは？',
        answer: '原則「1店舗につき1日1杯」が無料対象です。同日に複数店舗を回れば、その都度1杯無料でドリンクが提供されます（同一店舗で2杯目以降は、通常料金で提供）。対象ドリンク・銘柄・サイズ、サービスを受けるための条件は店舗や企画で異なります。'
      },
      {
        question: 'どんなドリンクが無料対象？',
        answer: '店舗ごとの「対象メニュー」からの提供が基本です（例：最初の1杯限定・指定銘柄・ソフトドリンク可など）。nomocaサイトのクーポンページで事前にご確認ください。'
      },
      {
        question: '年齢制限は？',
        answer: 'ソフトドリンクの提供に関しては、年齢制限はありません。アルコール入りドリンクは、20歳未満の飲酒は法律で禁止されています。店舗で身分証の提示を求める場合があります。また、飲酒運転は絶対にしないでください。'
      },
      {
        question: '同伴者の分も無料になりますか？',
        answer: '無料1杯はご本人アカウントのみです。1アカウント＝1名分が原則です。新規登録時に本人確認のためメール認証があります。'
      },
      {
        question: '使い方の流れは？',
        answer: '1) nomocaサイトで掲載店を検索 → 2) 入店 → 3) 店舗スタッフにnomocaサイトの「無料1杯」画面を提示 → 4) 店舗スタッフが確認 → 5) 無料ドリンクが提供 → 6) 会計時に値引。※提示タイミング・画面種別は店舗オペレーションにより多少異なります。'
      },
      {
        question: '支払い方法は？',
        answer: 'nomocaサイト内の月額課金です。利用可能な決済手段（例：各種クレジットカード、コード決済等）を選択できます。詳細はサイト内の画面でご確認ください。'
      },
      {
        question: '解約はどうする？更新日は？',
        answer: '更新日前日までにサイトで「退会」手続きしてください。課金期間中の途中解約は原則日割りになりません。解約後も更新日までは利用可です。'
      },
      {
        question: '機種変更・紛失時の引き継ぎは？',
        answer: '同一アカウント（ＩＤ・パスワード）でログインすれば、過去の情報が引き継がれます。ただし、同時ログイン数や不正利用防止の観点で端末制限がかかる場合があります。'
      },
      {
        question: '市外・県外からの来訪者も使える？',
        answer: '対象エリア内の掲載店であれば来訪者でも利用できます。'
      },
      {
        question: '店舗側の理由でサービスが利用できない場合は？',
        answer: '安全・品質確保のため、店舗判断で提供タイミングを調整する場合があります。提供不可・売切れ・商品不良などの際は代替メニューや別日振替の有無を店頭でご確認ください。'
      }
    ]
  },
  {
    title: '掲載店向け',
    items: [
      {
        question: '掲載費は？',
        answer: '掲載費は無料です（別途、掲載店様用の約款をご確認ください）。'
      },
      {
        question: '店舗のオペレーションは？',
        answer: '基本は「お客さまがクーポン画面提示 → 対象ドリンク1杯提供 → 会計処理（値引き等）」のシンプルな運用です。レジでの無料分処理（サービス扱い/割引/クーポン等）は既存フローに合わせた方法でご対応してください。'
      },
      {
        question: 'POSやレシート表記は？',
        answer: '店舗レジシステムに応じて「サービス値引き」「クーポン」等の勘定処理を推奨します。会計上の処理は、一般的に販促費となりますが、会計・税務上の扱いは顧問税理士等にご相談ください。'
      },
      {
        question: 'メニュー・画像・営業時間の更新は？',
        answer: '管理画面から更新依頼が可能です。反映までのリードタイムは、店舗側で直接管理画面から更新した後、運営側で承認後に反映されますが、タイミングや審査等の状況により反映までのリードタイムは異なります。'
      },
      {
        question: '休業・満席・提供一時停止の扱いは？',
        answer: '店舗都合で無料杯提供を一時停止する場合は、事前に運営側へご連絡ください。また、店頭ではユーザーが事前に分かるようにしてください。'
      },
      {
        question: '未成年・本人確認は？',
        answer: 'ソフトドリンクの場合、特に必要はありませんが、アルコール類の提供で年齢確認が必要と判断した場合は、身分証確認をお願いします。'
      },
      {
        question: '掲載停止・退会は？',
        answer: '規約違反、提供品質の著しい低下、法令違反等が確認された場合、運営判断で停止・退会となることがあります。通常の任意解約は契約に定める予告期間に従います。'
      }
    ]
  },
  {
    title: '行政・パートナー向け（概要）',
    items: [
      {
        question: '社会的な狙いと評価指標は？',
        answer: '来店回数・はしご率・平均滞在時間・客単価・曜日/時間帯分散・来街者の回遊性、地域ポイント循環など。観光・MICEとの連携や、市民満足度向上効果も今後検証できるようにしていきたいと考えています。'
      },
      {
        question: 'エコシステム連携は？',
        answer: '地域ポイント「たまポン」や商店会施策、観光キャンペーン等と組み合わせ、20万人規模のユーザー基盤活用による波及効果を想定しています（数値は目標の一例）。'
      }
    ]
  },
  {
    title: 'セキュリティ・プライバシー',
    items: [
      {
        question: '個人情報の取り扱いは？',
        answer: '利用目的の範囲で最小限を取得し、適切に管理します。必要に応じて、アクセス制御・ログ監査を行います。詳細はプライバシーポリシーをご確認ください。'
      },
      {
        question: '不正利用対策は？',
        answer: '1日1杯ルールの検知、同一アカウントの不自然な利用、端末・位置情報の整合性チェック、スクリーンショット防止策（画面動的要素・カウントダウン等）を段階導入します。'
      },
      {
        question: '位置情報は必須？',
        answer: '近隣店舗表示や不正対策のために許諾をお願いする場合があります。'
      }
    ]
  },
  {
    title: 'トラブルシューティング',
    items: [
      {
        question: '「無料1杯」が反映されない/押下できない',
        answer: '既に当日その店舗で1杯利用済みの可能性、通信不良／スマホの古いバージョン、店舗側の提供一時停止などが考えられます。nomocaサイト再起動、電波状況の確認、店舗スタッフへお知らせをお試しください。解決しない場合はサポート窓口へご連絡ください。'
      },
      {
        question: '課金・請求金額がおかしい',
        answer: 'ご利用サイトの履歴を確認してください。更新日前後のタイミング差異の可能性があります。明細（スクリーンショット）添付のうえサポートへご連絡ください。'
      },
      {
        question: '店舗が混雑・売切れで提供不可だった',
        answer: '当日の提供可否は店舗裁量です。代替メニューの有無や別日振替は店頭でご確認ください。'
      },
      {
        question: 'アカウントにログインできない',
        answer: 'パスワード再設定、スマホのバージョンの更新をお試しください。端末制限に該当する可能性もあります。解決しない場合はサポートへご連絡ください。'
      }
    ]
  },
  {
    title: 'ルール・マナー（重要）',
    items: [
      {
        question: '',
        answer: 'アルコール類の提供の場合、20歳未満の飲酒禁止／飲酒運転禁止\n迷惑行為（長時間の占有、大声、他客・スタッフへの迷惑）は利用停止対象\nたまのみサイト画面の不正転用・転売・貸与は禁止\n健康状態に留意し、節度ある飲酒を'
      }
    ],
    isAlwaysOpen: true
  },
  {
    title: '連絡先',
    items: [
      {
        question: 'ユーザーサポート',
        answer: 'サイト内「ヘルプ・お問い合わせ」'
      },
      {
        question: '掲載店サポート',
        answer: '運営窓口、営業担当へ'
      },
      {
        question: '取材・協業',
        answer: '運営窓口まで'
      }
    ],
    isContact: true
  }
]

const navLinks = [
  { href: '/lp#about', label: 'nomocaとは' },
  { href: '/lp#features', label: '魅力' },
  { href: '/lp#flow', label: '使い方' },
  { href: '/lp#pricing', label: '利用料金' },
  { href: '/lp#stores', label: '加盟店一覧' },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  useEffect(() => {
    document.body.classList.add('lp-page')
    return () => {
      document.body.classList.remove('lp-page')
    }
  }, [])

  const toggleItem = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const container = 'w-full max-w-[1200px] mx-auto px-6 lg:px-10'

  return (
    <div className="w-full bg-white text-[#111] overflow-x-hidden" style={{ fontFamily: '"Noto Sans JP", sans-serif' }}>
      {/* Header */}
      <header className="w-full py-4" style={{ position: 'relative', zIndex: 100 }}>
        <div className={`${container} flex items-center justify-between`}>
          <Link href="/lp">
            <Image 
              src="/horizon-2.svg" 
              alt="nomoca Kagawa" 
              width={170} 
              height={48} 
              className="w-[160px] h-auto lg:w-[170px]" 
              priority 
            />
          </Link>
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-[#0f1524]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[#2B7A78] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/lp/contact" className="hover:text-[#2B7A78] transition-colors">
              お問い合わせ
            </Link>
            <Link
              href="/lp/merchant"
              className="flex items-center justify-center rounded-full px-4 py-2 bg-[#2B7A78] text-white text-sm font-bold hover:brightness-110 transition ml-2"
            >
              お店の方はこちら
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full" style={{ backgroundColor: '#FAF8F4' }}>
        {/* Page Title Section */}
        <div className={`${container} py-20 lg:py-28`}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'stretch',
              gap: '24px',
              paddingBottom: '24px',
            }}
          >
            <h1
              style={{
                fontFamily: '"Oswald", sans-serif',
                fontWeight: 500,
                fontSize: '56px',
                lineHeight: '1em',
                color: '#2B7A78',
                textAlign: 'left',
              }}
            >
              FAQ
            </h1>
            <p
              style={{
                fontFamily: '"Noto Sans JP", sans-serif',
                fontWeight: 700,
                fontSize: '22px',
                lineHeight: '1em',
                color: '#2B7A78',
                textAlign: 'left',
              }}
            >
              よくあるご質問
            </p>
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="w-full px-6 lg:px-[120px] py-10 lg:py-20" style={{ backgroundColor: '#FAF8F4' }}>
          <div className="w-full max-w-[1200px] mx-auto">
            {faqData.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  marginBottom: sectionIndex < faqData.length - 1 ? '45px' : '0',
                }}
                className="mb-[45px] last:mb-0"
              >
                {/* Section Title */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '16px',
                    padding: '32px 0px',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '5px',
                      height: '100%',
                      backgroundColor: '#2B7A78',
                      flexShrink: 0,
                    }}
                  />
                  <h2
                    style={{
                      fontFamily: '"Noto Sans JP", sans-serif',
                      fontWeight: 500,
                      fontSize: '20px',
                      lineHeight: '1em',
                      color: '#000000',
                      textAlign: 'left',
                    }}
                  >
                    {section.title}
                  </h2>
                </div>

                {/* FAQ Items */}
                <div style={{ width: '100%', maxWidth: '940px' }}>
                  {section.isContact ? (
                    // Contact section with special layout
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        padding: '24px 0px',
                        borderTop: '1px solid #D5D5D5',
                        borderBottom: '1px solid #D5D5D5',
                        backgroundColor: '#FAF8F4',
                      }}
                      className="py-6 lg:py-8"
                    >
                      {section.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignSelf: 'stretch',
                            gap: '8px',
                          }}
                          className="lg:flex-row"
                        >
                          <div
                            style={{
                              fontFamily: '"Noto Sans JP", sans-serif',
                              fontWeight: 700,
                              fontSize: '14px',
                              lineHeight: '1.6em',
                              color: '#000000',
                              textAlign: 'left',
                              width: '150px',
                              flexShrink: 0,
                            }}
                            className="text-sm lg:text-base lg:w-[150px]"
                          >
                            {item.question}
                          </div>
                          <div
                            style={{
                              fontFamily: '"Noto Sans JP", sans-serif',
                              fontWeight: 400,
                              fontSize: '14px',
                              lineHeight: '1.6em',
                              color: '#000000',
                              textAlign: 'left',
                              flex: 1,
                            }}
                            className="text-sm lg:text-base lg:text-justify"
                          >
                            {item.answer}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Regular FAQ items
                    section.items.map((item, itemIndex) => {
                      const key = `${sectionIndex}-${itemIndex}`
                      const isOpen = section.isAlwaysOpen ? true : openItems[key]
                      const isLast = itemIndex === section.items.length - 1

                      return (
                        <div
                          key={itemIndex}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                            padding: '24px 0px',
                            borderTop: '1px solid #D5D5D5',
                            borderBottom: isLast ? '1px solid #D5D5D5' : 'none',
                            backgroundColor: '#FAF8F4',
                          }}
                          className="gap-6 lg:gap-10 py-6 lg:py-8"
                        >
                          {/* Question Button */}
                          {section.isAlwaysOpen && !item.question ? (
                            // No question, show answer directly
                            null
                          ) : section.isAlwaysOpen ? (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignSelf: 'stretch',
                                gap: '20px',
                              }}
                              className="gap-5 lg:gap-10"
                            >
                              <span
                                style={{
                                  fontFamily: '"Noto Sans JP", sans-serif',
                                  fontWeight: 500,
                                  fontSize: '14px',
                                  lineHeight: '1.6em',
                                  color: '#000000',
                                  flex: 1,
                                  textAlign: 'left',
                                }}
                                className="text-sm lg:text-base"
                              >
                                {item.question}
                              </span>
                            </div>
                          ) : (
                            <button
                              className="w-full text-left flex items-center justify-between hover:opacity-80 transition-opacity"
                              onClick={() => toggleItem(sectionIndex, itemIndex)}
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignSelf: 'stretch',
                                gap: '20px',
                              }}
                              className="gap-5 lg:gap-10"
                            >
                              <span
                                style={{
                                  fontFamily: '"Noto Sans JP", sans-serif',
                                  fontWeight: 500,
                                  fontSize: '14px',
                                  lineHeight: '1.6em',
                                  color: '#000000',
                                  flex: 1,
                                  textAlign: 'left',
                                }}
                                className="text-sm lg:text-base"
                              >
                                {item.question}
                              </span>
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  gap: '10px',
                                  padding: '4px 16px',
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '9999px',
                                  backgroundColor: '#2B7A78',
                                  flexShrink: 0,
                                }}
                              >
                                <span
                                  style={{
                                    color: '#FFFFFF',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    lineHeight: '1',
                                  }}
                                >
                                  {isOpen ? '−' : '+'}
                                </span>
                              </div>
                            </button>
                          )}

                          {/* Answer */}
                          {isOpen && (
                            <div style={{ width: '100%' }}>
                              <p
                                style={{
                                  fontFamily: '"Noto Sans JP", sans-serif',
                                  fontWeight: 400,
                                  fontSize: '14px',
                                  lineHeight: '1.6em',
                                  color: '#000000',
                                  textAlign: 'left',
                                  whiteSpace: 'pre-line',
                                }}
                                className="text-sm lg:text-base lg:text-justify"
                              >
                                {item.answer}
                              </p>
                            </div>
                          )}
                          {/* Always show answer if no question */}
                          {section.isAlwaysOpen && !item.question && (
                            <div style={{ width: '100%' }}>
                              <p
                                style={{
                                  fontFamily: '"Noto Sans JP", sans-serif',
                                  fontWeight: 400,
                                  fontSize: '14px',
                                  lineHeight: '1.6em',
                                  color: '#000000',
                                  textAlign: 'left',
                                  whiteSpace: 'pre-line',
                                }}
                                className="text-sm lg:text-base lg:text-justify"
                              >
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-[#eee]">
        <div className={`${container} py-10`}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'stretch',
              gap: '24px',
              padding: '56px 0px 0px',
            }}
          >
            {/* Logo */}
            <Image
              src="/favicon.png"
              alt="nomoca Kagawa"
              width={294}
              height={294}
              style={{
                width: '200px',
                height: '200px',
              }}
              className="w-[200px] h-[200px] lg:w-[294px] lg:h-[294px]"
            />

            {/* Links */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
              className="gap-5 lg:gap-10"
            >
            <Link href="/lp/faq" className="hover:text-[#2B7A78] transition-colors" style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 500, fontSize: '16px', lineHeight: '1em', color: '#000000' }}>
              よくあるご質問
            </Link>
            <Link href="/lp/contact" className="hover:text-[#2B7A78] transition-colors" style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 500, fontSize: '16px', lineHeight: '1em', color: '#000000' }}>
              お問い合わせ
            </Link>
            <a href="/プライバシーポリシー.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#2B7A78] transition-colors" style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 500, fontSize: '16px', lineHeight: '1em', color: '#000000' }}>
              プライバシーポリシー
            </a>
            <a href="/特定商取引法.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#2B7A78] transition-colors" style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 500, fontSize: '16px', lineHeight: '1em', color: '#000000' }}>
              特定商取引法に基づく表記
            </a>
            <Link href="/lp/terms" className="hover:text-[#2B7A78] transition-colors" style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 500, fontSize: '16px', lineHeight: '1em', color: '#000000' }}>
              ご利用規約
            </Link>
            <a href="#" className="hover:text-[#2B7A78] transition-colors" style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 500, fontSize: '16px', lineHeight: '1em', color: '#000000' }}>
              運営会社
            </a>
            </div>

            {/* Copyright */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                gap: '40px',
                padding: '40px 0px',
                borderTop: '1px solid #000000',
              }}
            >
              <p
                style={{
                  fontFamily: '"Oswald", sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '1em',
                  color: '#000000',
                  textAlign: 'center',
                }}
              >
                ©2025 nomoca Kagawa
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
