import {literal, QueryInterface} from 'sequelize';
import {ModelAttributes} from "sequelize/types/model";

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface): Promise<void> => {

    // users table
    await queryInterface.createTable('cinema', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'varchar' },
      isAdmin: {type: 'boolean', defaultValue: false},
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    // cinema table
    await queryInterface.createTable('cinema', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'varchar' },
      ownerId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'user',
          },
          key: 'id',
        }
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    // films
    await queryInterface.createTable('film', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'varchar' },
      cinemaId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'cinema',
          },
          key: 'id',
        }
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    // showroom table
    await queryInterface.createTable('showroom', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      filmId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'film',
          },
          key: 'id',
        }
      },
      cinemaId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'cinema',
          },
          key: 'id',
        }
      },
      startAt: {
        type: 'timestamp'
      },
      endAt: {
        type: 'timestamp'
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    // seating
    await queryInterface.createTable('seating', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      isAvailable: {type: 'boolean', defaultValue: false},
      cinemaId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'cinema',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      showroomId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'showroom',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      type: {
        type: 'varchar',
        defaultValue: 'ordinary'
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    // tickets
    await queryInterface.createTable('tickets', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      pricing: {
        type: 'float',
        defaultValue: 0.00
      },
      cinemaId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'cinema',
          },
          key: 'id',
        }
      },
      showroomId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'showroom',
          },
          key: 'id',
        }
      },
      filmId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'film',
          },
          key: 'id',
        },
      },
      seatingId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'film',
          },
          key: 'id',
        }
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users')
    await queryInterface.dropTable('cinema')
    await queryInterface.dropTable('film')
    await queryInterface.dropTable('showroom')
    await queryInterface.dropTable('seating')
    await queryInterface.dropTable('tickets')
  },
};
