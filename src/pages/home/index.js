import Layout from "../../components/Layout";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styles from "./index.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
    
      <Layout>
        <div className={styles.imgSlider}>
          <Carousel dots autoplay arrows>
            <div className={styles.imgBox}>
              <img
                src="/img3.jpeg"
                alt="img3"
                width={"1920"}
                height={"1080"}
              />
            </div>
            <div className={styles.imgBox}>
              <img
                src="/img3.jpeg"
                alt="img3"
                width={"1920"}
                height={"1080"}
              />
            </div>
            <div className={styles.imgBox}>
              <img
                src="/img3.jpeg"
                alt="img3"
                width={"1920"}
                height={"1080"}
              />
            </div>
            <div className={styles.imgBox}>
              <img
                src="/img3.jpeg"
                alt="img3"
                width={"1920"}
                height={"1080"}
              />
            </div>
          </Carousel>
        </div>
      </Layout>
    </div>
  );
}
