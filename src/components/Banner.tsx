type BannerProps = { title: string };

const Banner = ({ title }: BannerProps) => (
    <h1 className="mt-6 mb-6 text-center text-3xl font-semibold">{title}</h1>
);

export default Banner;