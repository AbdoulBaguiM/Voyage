import styled from "styled-components";

export const Banner = () => {
  return (
    <BannerSection>
      <span>
        <h2>Pas sûr de la destination ?</h2>
        <a href="#" className="btn btn-dark">
          {"Je suis flexible"}
        </a>
      </span>
    </BannerSection>
  );
}

const BannerSection = styled.section`
  padding: 6rem var(--sidePadding);
  background: url(/images/banner.jpg);
  background-size: cover;
  border-radius: 1rem;
  color: var(--brown);
  span {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: var(--maxWidth);
  }
  h2 {
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    line-height: 1.2;
    margin-bottom: 1.5rem;
    font-weight: 800;
  }
  .btn.btn-dark {
    --bgcolor: var(--brown);
    --color: var(--yellow);
  }

  @media (max-width: 36rem) {
    aspect-ratio: 0.75;
    background: url(images/banner-sm.jpg);
    background-size: cover;
    background-position: center;

    span {
      align-items: center;
      text-align: center;
    }
  }
`;
