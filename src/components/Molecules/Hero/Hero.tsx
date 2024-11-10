import Translate from "@/locales/Translate";
import Button from "@components/Atoms/Button/Button";
import { ButtonVariantsEnum, IconsEnum, iconsPlacementEnum } from "@components/enums";
import textResolver from "@lib/textResolver";
import classNames from "classnames";
import styles from "./Hero.module.scss";

const Hero = ({ blok, preview, locale }: { blok: any; preview: boolean; locale: string }) => {
  return (
    <section className={classNames()}>
      <h1 className={styles.ftitle}>title:{blok.title}</h1>
      <h2>
        <Translate locale={locale} token={"title.home"} />
      </h2>
      <div className={styles.info}>{textResolver(blok.info)}</div>
      <div className={styles.buttonWrapper}>
        {blok?.buttons?.map((button) => (
          <Button
            key={button.uuid}
            title={button.title}
            link={button.link}
            iconPosition={iconsPlacementEnum.FRONT}
            icon={"arrowRight"}
            variant={ButtonVariantsEnum[button.variant]}
            darkmode
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
