type BannerProps = { title: string };

const Banner = ({ title }: BannerProps) => (
    <strong><h1>{title}</h1></strong>
);

export default Banner;