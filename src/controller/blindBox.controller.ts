// src_backend/controller/blindBox.controller.ts
import { Controller, Get, Post, Del, Put, Body, Query, Inject } from "@midwayjs/core";
import { BlindBoxService } from "../service/blindBox.service";

@Controller("/blind-box")
export class BlindBoxController {
  @Inject()
  blindBoxService: BlindBoxService;

  @Get("/")
  public async getAllBlindBoxes() {
    const blindBoxes = await this.blindBoxService.getAllBlindBoxes();
    return { success: true, blindBoxes };
  }

  @Post("/")
  public async addBlindBox(
    @Body("name") name: string,
    @Body("description") description: string,
    @Body("price") price: number
  ) {
    const id = await this.blindBoxService.addBlindBox(name, description, price);
    return { success: true, id };
  }

  @Del("/")
  public async deleteBlindBox(@Query("id") id: number) {
    await this.blindBoxService.deleteBlindBox(id);
    return { success: true };
  }

  @Put("/")
  public async updateBlindBox(
    @Query("id") id: number,
    @Body("name") name: string,
    @Body("description") description: string,
    @Body("price") price: number
  ) {
    await this.blindBoxService.updateBlindBox(id, name, description, price);
    return { success: true };
  }
}