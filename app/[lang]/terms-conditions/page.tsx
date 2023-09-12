import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'

export default async function TermsConditions({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = await getTranslation(lang, 'terms-conditions')

  return (
    <>
      {/* title */}
      <div id="tc-title">
        <h2>{t('terms-conditions')}</h2>
      </div>
      {/* //title */}

      {/* section: terms and conditions */}
      <section id="terms-and-conditions">
        <h3>
          {t('article1')}
        </h3>

        <p>
          {t('article1-1')}
        </p>

        <h3>
          {t('article2')}
        </h3>

        <p>
          {t('article2-1')}
        </p>

        <ol className="number-list">
          <li>
            {t('article2-2')}
          </li>
          <li>
            {t('article2-3')}
          </li>
          <li>
            {t('article2-4')}
          </li>
          <li>
            {t('article2-5')}
          </li>
          <li>
            {t('article2-6')}
          </li>
          <li>
            {t('article2-7')}
          </li>
          <li>
            {t('article2-8')}
          </li>
          <li>
            {t('article2-9')}
          </li>
          <li>
            {t('article2-10')}
          </li>
        </ol>

        <h3>
          {t('article3')}
        </h3>

        <ol>
          <li>
            {t('article3-1')}
          </li>
          <li>
            {t('article3-2')}
          </li>
          <li>
            {t('article3-3')}
          </li>
          <li>
            {t('article3-4')}
          </li>
        </ol>

        <h3>
          {t('article4')}
        </h3>

        <ol>
          <li>
            {t('article4-1')}
          </li>
          <li>
            {t('article4-2')}
          </li>
          <li>
            {t('article4-3')}
          </li>
        </ol>

        <h3>
          {t('article5')}
        </h3>

        <ol>
          <li>
            {t('article5-1')}
          </li>
          <li>
            {t('article5-2')}
          </li>
          <li>
            {t('article5-3')}
          </li>
          <li>
            {t('article5-4')}
            <ol className="nested-list">
              <li>
                {t('article5-5')}
              </li>
              <li>
                {t('article5-6')}
              </li>
              <li>
                {t('article5-7')}
              </li>
              <li>
                {t('article5-8')}
              </li>
              <li>
                {t('article5-9')}
              </li>
              <li>
                {t('article5-10')}
              </li>
              <li>
                {t('article5-11')}
              </li>
            </ol>
          </li>
          <li>
            {t('article5-12')}
          </li>
        </ol>

        <h3>
          {t('article6')}
        </h3>

        <ol>
          <li>
            {t('article6-1')}
          </li>
          <li>
            {t('article6-2')}
          </li>
          <li>
            {t('article6-3')}
          </li>
        </ol>

        <h3>
          {t('article7')}
        </h3>

        <ol>
          <li>
            {t('article7-1')}
          </li>
          <li>
            {t('article7-2')}
          </li>
          <li>
            {t('article7-3')}
          </li>
          <li>
            {t('article7-4')}
          </li>
          <li>
            {t('article7-5')}
          </li>
        </ol>

        <h3>
          {t('article8')}
        </h3>

        <ol>
          <li>
            {t('article8-1')}
          </li>
          <li>
            {t('article8-2')}
          </li>
        </ol>

        <h3>
          {t('article9')}
        </h3>

        <ol>
          <li>
            {t('article9-1')}
          </li>
          <li>
            {t('article9-2')}
          </li>
          <li>
            {t('article9-3')}
          </li>
        </ol>

        <h3>
          {t('article10')}
        </h3>

        <ol>
          <li>
            {t('article10-1')}
          </li>
          <li>
            {t('article10-2')}
          </li>
          <li>
            {t('article10-3')}
          </li>
        </ol>

        <h3>
          {t('article11')}
        </h3>

        <ol>
          <li>
            {t('article11-1')}
            <ol className="nested-list">
              <li>
                {t('article11-2')}
              </li>
              <li>
                {t('article11-3')}
              </li>
              <li>
                {t('article11-4')}
              </li>
              <li>
                {t('article11-5')}
              </li>
              <li>
                {t('article11-6')}
              </li>
              <li>
                {t('article11-7')}
              </li>
              <li>
                {t('article11-8')}
              </li>
              <li>
                {t('article11-9')}
              </li>
              <li>
                {t('article11-10')}
              </li>
              <li>
                {t('article11-11')}
              </li>
              <li>
                {t('article11-12')}
              </li>
              <li>
                {t('article11-13')}
              </li>
            </ol>
          </li>

          <li>
            {t('article11-14')}            
          </li>
          <li>
            {t('article11-15')}
          </li>
          <li>
            {t('article11-16')}
          </li>
          <li>
            {t('article11-17')}
          </li>
        </ol>

        <h3>
          {t('article12')}
        </h3>

        <ol>
          <li>
            {t('article12-1')}
          </li>
          <li>
            {t('article12-2')}
          </li>
          <li>
            {t('article12-3')}
          </li>
          <li>
            {t('article12-4')}
          </li>
          <li>
            {t('article12-5')}
          </li>
          <li>
            {t('article12-6')}
            <ol className="nested-list">
              <li>
                {t('article12-7')}
              </li>
              <li>
                {t('article12-8')}
              </li>
              <li>
                {t('article12-9')}
              </li>
              <li>
                {t('article12-10')}
              </li>
              <li>
                {t('article12-11')}
              </li>
            </ol>
          </li>
          <li>
            {t('article12-12')}
          </li>
        </ol>

        <h3>
          {t('article13')}
        </h3>

        <ol>
          <li>
            {t('article13-1')}
          </li>
          <li>
            {t('article13-2')}
          </li>
          <li>
            {t('article13-3')}
          </li>
        </ol>

        <h3>
          {t('article14')}
        </h3>

        <ol>
          <li>
            {t('article14-1')}
          </li>
          <li>
            {t('article14-2')}
          </li>
          <li>
            {t('article14-3')}
          </li>
        </ol>

        <h3>
          {t('article15')}
        </h3>

        <ol>
          <li>
            {t('article15-1')}
          </li>
          <li>
            {t('article15-2')}
          </li>
          <li>
            {t('article15-3')}
          </li>
          <li>
            {t('article15-4')}
          </li>
        </ol>

        <h3>
          {t('article16')}
        </h3>

        <ol>
          <li>
            {t('article16-1')}
          </li>
          <li>
            {t('article16-2')}
          </li>
          <li>
            {t('article16-3')}
          </li>
          <li>
            {t('article16-4')}
          </li>
          <li>
            {t('article16-5')}
          </li>
          <li>
            {t('article16-6')}
          </li>
          <li>
            {t('article16-7')}
          </li>
        </ol>

        <h3>
          {t('article17')}
        </h3>

        <ol>
          <li>
            {t('article17-1')}
          </li>
          <li>
            {t('article17-2')}
          </li>
          <li>
            {t('article17-3')}
          </li>
        </ol>
            
        <h3>
          {t('article18')}
        </h3>

        <p>
          {t('article18-1')}
        </p>

        <p>
          {t('article18-2')}
        </p>

        <p>
          {t('article18-3')}
        </p>

        <p>
          {t('article18-4')}
        </p>

        <p>
          {t('article18-5')}
        </p>

        <h3>
          {t('article19')}
        </h3>

        <p>
          {t('article19-1')}
        </p>

        <p>
          {t('dash')}
        </p>

        <p>
          {t('date')}
        </p>
      </section>
      {/* //section: terms and conditions */}
    </>
  )
}
