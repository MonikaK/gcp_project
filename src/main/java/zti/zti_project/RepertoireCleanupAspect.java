package zti.zti_project;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import zti.zti_project.repository.RepertoireRepository;

import java.time.LocalDate;

/**
 * Aspect class for cleaning up expired records in the repertoire.
 */
@Aspect
@Component
public class RepertoireCleanupAspect {

    private final RepertoireRepository repertoireRepository;

    /**
     * Constructor of the class with the provided RepertoireRepository.
     *
     * @param repertoireRepository The repository for managing repertoire records.
     */
    @Autowired
    public RepertoireCleanupAspect(RepertoireRepository repertoireRepository) {
        this.repertoireRepository = repertoireRepository;
    }

    /**
     * A pointcut definition that matches the execution of methods within the RepertoireController.
     */
    @Pointcut("execution(* zti.zti_project.controller.RepertoireController.*(..))")
    public void repertoireRepositoryPointcut() {}

    /**
     * Method cleaning up expired records in the repertoire before any method execution within the RepertoireRepository.
     */
    @Before("repertoireRepositoryPointcut()")
    public void cleanupExpiredRepositoryRecords() {
        LocalDate currentDate = LocalDate.now();
        repertoireRepository.deleteExpiredMovies(currentDate);
    }
}
