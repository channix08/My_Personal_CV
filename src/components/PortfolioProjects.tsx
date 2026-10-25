import { ArrowSquareOut, FolderOpen } from '@/components/slab'
import { portfolioProjects } from '@/data/projects'

export default function PortfolioProjects() {
  return (
    <section className="pgrid portfolio-projects" aria-labelledby="projects-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Projects</span>
        <h1 className="pgrid__title" id="projects-title">Projects</h1>
        <p className="pgrid__lede">Academic and personal projects will appear here as I add them.</p>
      </header>

      {portfolioProjects.length === 0 ? (
        <div className="home__glass portfolio-projects__empty">
          <span className="portfolio-projects__empty-icon"><FolderOpen size={52} weight="duotone" aria-hidden="true" /></span>
          <span className="pgrid__eyebrow">No projects added yet</span>
          <h2>Work in progress.</h2>
          <p>I’ll share my web development and video editing projects here when they’re ready.</p>
        </div>
      ) : (
        <ul className="portfolio-projects__grid" role="list">
          {portfolioProjects.map((project) => (
            <li className="home__glass portfolio-projects__card" key={project.title}>
              {project.imageUrl && <img className="portfolio-projects__image" src={project.imageUrl} alt={`${project.title} preview`} loading="lazy" />}
              <div className="portfolio-projects__card-body">
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                {project.technologies.length > 0 && (
                  <ul className="portfolio-projects__tags" role="list">
                    {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                )}
                <div className="portfolio-projects__links">
                  {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">GitHub <ArrowSquareOut size={16} aria-hidden="true" /></a>}
                  {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Live demo <ArrowSquareOut size={16} aria-hidden="true" /></a>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
