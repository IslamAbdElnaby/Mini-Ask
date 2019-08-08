using Microsoft.EntityFrameworkCore.Migrations;

namespace FirstWebCore.Migrations
{
    public partial class addSeen : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ansSeen",
                table: "Posts",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "qSeen",
                table: "Posts",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "seen",
                table: "Likes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ansSeen",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "qSeen",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "seen",
                table: "Likes");
        }
    }
}
