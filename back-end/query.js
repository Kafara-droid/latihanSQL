const database = require('./no-need-to-edit/db.config');

const query = {
  getCountByRating: async () => {
    try {
      const result = await database.raw(`
        SELECT rating, COUNT(film_id) AS movie_count FROM film GROUP BY rating;
      `);
      return result[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getCountBySpecialFeatures: async () => {
    try {
      const result = await database.raw(`
        SELECT tag_name AS feature, COUNT(film_id) AS movie_count
        FROM (
          SELECT film_id, SUBSTRING_INDEX(SUBSTRING_INDEX(special_features, ',', t.n), ',', -1) AS tag_name
          FROM film
          CROSS JOIN (
            SELECT 1 AS n UNION ALL SELECT 2 UNION ALL SELECT 3
          ) AS t
          WHERE CHAR_LENGTH(special_features) - CHAR_LENGTH(REPLACE(special_features, ',', '')) >= t.n - 1
        ) AS subquery
        GROUP BY tag_name;
      `);
      return result[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getTopCustomers: async () => {
    try {
      const result = await database.raw(`
        SELECT c.customer_id, c.first_name, c.last_name, COUNT(r.rental_id) AS rental_count
        FROM rental r
        JOIN customer c ON r.customer_id = c.customer_id
        GROUP BY c.customer_id
        ORDER BY rental_count DESC
        LIMIT 10;
      `);
      return result[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getFilmCategoryPercentage: async () => {
    try {
      const result = await database.raw(`
        SELECT
            category.name AS category_name,
            COUNT(film.film_id) AS film_count,
            ROUND((COUNT(film.film_id) * 100.0) / (SELECT COUNT(*) FROM film), 2) AS percentage
        FROM
            film
        JOIN
            film_category ON film.film_id = film_category.film_id
        JOIN
            category ON film_category.category_id = category.category_id
        GROUP BY
            category.name
        ORDER BY
            percentage DESC;
      `);
      return result[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getTopFilmsByActorCount: async () => {
    try {
      const result = await database.raw(`
        SELECT film.film_id, film.title, COUNT(*) AS actor_count
        FROM film
        JOIN film_actor ON film.film_id = film_actor.film_id
        GROUP BY film.film_id, film.title
        ORDER BY actor_count DESC
        LIMIT 25;
      `);
      return result[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getTopCustomersByPayment: async () => {
    try {
      const result = await database.raw(`
        SELECT c.customer_id, c.first_name, SUM(p.amount) AS total_payment
        FROM customer AS c
        JOIN payment AS p ON c.customer_id = p.customer_id
        GROUP BY c.customer_id, c.first_name
        ORDER BY total_payment DESC
        LIMIT 10;
      `);
      return result[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getFilmCountByLanguage: async () => {
    try {
      const result = await database.raw(`
        SELECT 
            language.name AS language_name,
            COUNT(f.film_id) AS film_count
        FROM 
            film f
        JOIN 
            language ON f.language_id = language.language_id
        GROUP BY 
            language.name;
      `);
      return result[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getDailyIncome: async () => {
    try {
      const result = await database.raw(`
        SELECT
            DATE(payment_date) AS transaction_date,
            SUM(amount) AS total_daily_income
        FROM
            payment
        GROUP BY
            DATE(payment_date);
      `);
      return result[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getRentalCountByMonthAndCategory: async () => {
    try {
      const result = await database.raw(`
        SELECT 
            ca.name AS category_name,
            COUNT(r.rental_id) AS rental_count
        FROM 
            rental r
        JOIN 
            inventory i ON r.inventory_id = i.inventory_id
        JOIN 
            film f ON i.film_id = f.film_id
        JOIN 
            film_category ON f.film_id = film_category.film_id
        JOIN 
            category ca ON film_category.category_id = ca.category_id
        GROUP BY 
            DATE_FORMAT(r.rental_date, '%Y-%m'), ca.name
        ORDER BY 
            DATE_FORMAT(r.rental_date, '%Y-%m'), ca.name;
      `);
      return result[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getTopFilmsByRentalDuration: async () => {
    try {
      const result = await database.raw(`
        SELECT
            f.title AS film_title,
            SUM(TIMESTAMPDIFF(HOUR, r.rental_date, r.return_date)) AS rental_duration_hours
        FROM
            rental r
        JOIN
            inventory i ON r.inventory_id = i.inventory_id
        JOIN
            film f ON i.film_id = f.film_id
        GROUP BY
            f.film_id, f.title
        ORDER BY
            rental_duration_hours DESC
        LIMIT 25;
      `);
      return result[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = query;
